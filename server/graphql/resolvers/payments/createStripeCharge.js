/* eslint-disable consistent-return */
const production = process.env.NODE_ENV === 'production';

const STRIPE_SECRET_KEY = production
  ? process.env.STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY_TEST;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const { calculateTotalAmount } = require('../../../constants');
const { createActivity } = require('../activity');
const {
  createStripePaymentError,
  depositSuccess,
  greaterThanError,
  stripePaymentSuccess,
} = require('./constants');
const { CustomError, errorLogger, sendEmail } = require('../../../helpers');
const {
  submitAccountDepositUser,
  submitExternalPayment,
} = require('../../../db');

const createStripeCharge = async (
  { amount, email, issueId, token },
  { authError, userId = null },
) => {
  try {
    if (authError) throw new CustomError(authError);

    if (amount < 1) throw new CustomError(greaterThanError);

    const totalAmount = calculateTotalAmount(amount);
    await stripe.charges.create({
      amount: totalAmount,
      currency: 'usd',
      description: 'Customer charge',
      source: token,
    });

    if (issueId) {
      const { fundedAmount, repoId } = await submitExternalPayment({
        action: 'fund_issue',
        fundValue: amount,
        issueId,
        platform: 'stripe',
        userId,
      });

      const activityInput = {
        actionType: 'fund',
        fundedValue: amount,
        issueId,
        repoId,
        userId,
      };
      await createActivity({ activityInput });

      sendEmail({
        body: { amount, email, issueId, userId },
        path: '/s/funding/fundedIssue',
      });

      return {
        __typename: 'Payment',
        fundedAmount,
        message: stripePaymentSuccess,
      };
    }
    if (userId) {
      const userResult = await submitAccountDepositUser({
        amount,
        platform: 'stripe',
        userId,
      });

      const activityInput = {
        actionType: 'fund',
        fundedValue: amount,
        isPrivate: true,
        userId,
      };
      await createActivity({ activityInput });

      await sendEmail({
        body: { amount, userId },
        path: '/s/funding/fundedAccount',
      });

      return {
        __typename: 'Payment',
        balance: userResult.balance,
        message: depositSuccess,
      };
    }
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createStripePaymentError({ issueId }),
    };
  }
};

module.exports = createStripeCharge;

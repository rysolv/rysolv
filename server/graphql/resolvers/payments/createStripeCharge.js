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
const { CustomError, errorLogger } = require('../../../helpers');
const {
  submitAccountDepositUser,
  submitExternalPayment,
} = require('../../../db');

const createStripeCharge = async (
  { amount, issueId, token },
  { authError, userId },
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
      const { fundedAmount, organizationId } = await submitExternalPayment({
        fundValue: amount,
        issueId,
      });

      const activityInput = {
        actionType: 'fund',
        fundedValue: amount,
        issueId,
        organizationId,
      };
      await createActivity({ activityInput });

      return {
        __typename: 'Payment',
        fundedAmount,
        message: stripePaymentSuccess,
      };
    }
    if (userId) {
      const userResult = await submitAccountDepositUser({ amount, userId });

      const activityInput = {
        actionType: 'fund',
        fundedValue: amount,
        userId,
      };
      await createActivity({ activityInput });

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

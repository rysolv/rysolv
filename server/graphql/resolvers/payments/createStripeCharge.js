/* eslint-disable consistent-return */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { calculateTotalAmount } = require('../../../constants');
const { createActivity } = require('../activity');
const {
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
} = require('../../../db');

const createStripeCharge = async args => {
  const { amount, issueId, token, userId } = args;
  const totalAmount = calculateTotalAmount(amount);
  try {
    if (amount < 1) {
      throw new Error('Amount must be greater than $0.99');
    }
    await stripe.charges.create({
      amount: totalAmount,
      currency: 'usd',
      description: 'Customer charge',
      source: token,
    });

    if (issueId) {
      const issueResult = await submitAccountPaymentIssue({
        fundValue: amount,
        issueId,
      });
      await submitAccountPaymentOrganization({
        fundValue: amount,
        organizationId: issueResult.organization_id,
      });

      const activityInput = {
        actionType: 'fund',
        fundedValue: amount,
        issueId,
        organizationId: issueResult.organization_id,
      };
      await createActivity({ activityInput });

      return {
        __typename: 'Payment',
        fundedAmount: issueResult.funded_amount,
        message: 'Thank you for funding!',
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
        message: 'You have successfully deposited money into your account!',
      };
    }
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = createStripeCharge;

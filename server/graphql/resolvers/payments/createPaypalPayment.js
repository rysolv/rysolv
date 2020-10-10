/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  createPaypalPaymentError,
  depositSuccess,
  greaterThanError,
  paypalPaymentSuccess,
} = require('./constants');
const {
  submitAccountDepositUser,
  submitExternalPayment,
} = require('../../../db');

const createPaypalPayment = async ({ amount, issueId, userId }) => {
  try {
    if (amount < 1) {
      const error = new Error();
      error.message = greaterThanError;
      throw error;
    }

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
        message: paypalPaymentSuccess,
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
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || createPaypalPaymentError({ issueId }),
    };
  }
};

module.exports = createPaypalPayment;

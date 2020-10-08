/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  accountPaymentSuccess,
  lowBalanceError,
  submitAccountPaymentError,
} = require('./constants');
const { getOneUser, submitInternalPayment } = require('../../../db');

const submitAccountPayment = async ({ fundValue, issueId, userId }) => {
  try {
    if (issueId) {
      const { balance } = await getOneUser({ userId });
      const adjustedBalance = balance - fundValue;
      if (adjustedBalance >= 0) {
        const {
          balance: newBalance,
          organizationId,
          fundedAmount,
        } = await submitInternalPayment({
          fundValue,
          issueId,
          userId,
        });

        const activityInput = {
          actionType: 'fund',
          fundedValue: fundValue,
          issueId,
          organizationId,
          userId,
        };
        await createActivity({ activityInput });

        const result = {
          balance: newBalance,
          fundedAmount,
        };
        return {
          __typename: 'Payment',
          message: accountPaymentSuccess,
          ...result,
        };
      }
      const error = new Error();
      error.message = lowBalanceError;
      throw error;
    }
  } catch (error) {
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || submitAccountPaymentError,
    };
  }
};

module.exports = submitAccountPayment;

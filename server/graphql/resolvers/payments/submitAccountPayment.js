/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  accountPaymentSuccess,
  lowBalanceError,
  submitAccountPaymentError,
} = require('./constants');
const { errorLogger } = require('../../../helpers');
const { getUserSettings, submitInternalPayment } = require('../../../db');

const submitAccountPayment = async (
  { fundValue, issueId },
  { authError, userId },
) => {
  try {
    if (authError) throw new Error(authError);

    if (issueId) {
      const { balance } = await getUserSettings({ userId });
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
    errorLogger(error);
    return {
      __typename: 'Error',
      message: message || submitAccountPaymentError,
    };
  }
};

module.exports = submitAccountPayment;

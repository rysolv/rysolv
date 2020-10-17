/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  accountPaymentSuccess,
  lowBalanceError,
  submitAccountPaymentError,
} = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');
const { getUserSettings, submitInternalPayment } = require('../../../db');

const submitAccountPayment = async (
  { fundValue, issueId },
  { authError, userId },
) => {
  try {
    if (authError) throw new CustomError(authError);

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
      throw new CustomError(lowBalanceError);
    }
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || submitAccountPaymentError,
    };
  }
};

module.exports = submitAccountPayment;

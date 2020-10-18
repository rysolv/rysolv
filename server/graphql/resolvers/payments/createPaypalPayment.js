/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  createPaypalPaymentError,
  depositSuccess,
  greaterThanError,
  paypalPaymentSuccess,
} = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');
const {
  submitAccountDepositUser,
  submitExternalPayment,
} = require('../../../db');

const createPaypalPayment = async (
  { amount, issueId },
  { authError, userId },
) => {
  try {
    if (authError) throw new CustomError(authError);

    if (amount < 1) throw new CustomError(greaterThanError);

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
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createPaypalPaymentError({ issueId }),
    };
  }
};

module.exports = createPaypalPayment;

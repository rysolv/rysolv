/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  createPaypalPaymentError,
  depositSuccess,
  greaterThanError,
  paypalPaymentSuccess,
} = require('./constants');
const { CustomError, errorLogger, sendEmail } = require('../../../helpers');
const {
  submitAccountDepositUser,
  submitExternalPayment,
} = require('../../../db');

const createPaypalPayment = async (
  { amount, email, issueId },
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

      sendEmail({
        body: { amount, email, issueId, userId },
        path: '/s/funding/fundedIssue',
      });

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
        isPrivate: true,
        userId,
      };
      await createActivity({ activityInput });

      sendEmail({
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
      message: alert || createPaypalPaymentError({ issueId }),
    };
  }
};

module.exports = createPaypalPayment;

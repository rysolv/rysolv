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
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
} = require('../../../db');

const createPaypalPayment = async (
  { amount, issueId },
  { authError, userId },
) => {
  try {
    if (authError) throw new Error(authError);

    if (amount < 1) {
      const error = new Error();
      error.message = greaterThanError;
      throw error;
    }

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

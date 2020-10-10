/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  accountPaymentSuccess,
  lowBalanceError,
  submitAccountPaymentError,
} = require('./constants');
const {
  getOneUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
} = require('../../../db');

const submitAccountPayment = async (
  { fundValue, issueId },
  { authError, userId },
) => {
  try {
    if (authError) throw new Error(authError);

    if (issueId) {
      const { balance } = await getOneUser({ userId });
      const adjustedBalance = balance - fundValue;
      if (adjustedBalance >= 0) {
        const issueResult = await submitAccountPaymentIssue({
          fundValue,
          issueId,
        });
        await submitAccountPaymentOrganization({
          fundValue,
          organizationId: issueResult.organization_id,
        });
        const userResult = await submitAccountPaymentUser({
          fundValue,
          userId,
        });

        const activityInput = {
          actionType: 'fund',
          fundedValue: fundValue,
          issueId,
          organizationId: issueResult.organization_id,
          userId,
        };
        await createActivity({ activityInput });

        const result = {
          balance: userResult.balance,
          fundedAmount: issueResult.funded_amount,
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

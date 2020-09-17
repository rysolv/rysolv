/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  getOneUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
} = require('../../../db');

const submitAccountPayment = async args => {
  const { fundValue, issueId, userId } = args;
  try {
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
          message: 'Thank you for funding!',
          ...result,
        };
      }
    } else {
      const error = new Error('Balance is too low');
      throw error;
    }
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = submitAccountPayment;

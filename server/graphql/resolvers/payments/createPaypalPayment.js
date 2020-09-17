/* eslint-disable consistent-return */
const { createActivity } = require('../activity');
const {
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
} = require('../../../db');

const createPaypalPayment = async args => {
  const { amount, issueId, userId } = args;
  try {
    if (amount < 1) {
      throw new Error('Amount must be greater than $0.99');
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
        message: 'Your Paypal payment has been successful!',
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

module.exports = createPaypalPayment;

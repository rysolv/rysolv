const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const {
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
} = require('../../db');
const { createActivity } = require('./activityResolver');

module.exports = {
  createStripeCharge: async args => {
    const { amount, issueId, organizationId, token, userId } = args;
    try {
      await stripe.charges.create({
        amount: amount * 100,
        currency: 'usd',
        description: 'Customer charge',
        source: token,
      });

      const [issueResult] = await submitAccountPaymentIssue(issueId, amount);
      await submitAccountPaymentOrganization(organizationId, amount);

      const activityInput = {
        actionType: 'fund',
        fundedValue: amount,
        issueId,
        organizationId,
        userId,
      };
      await createActivity({ activityInput });

      const result = {
        fundedAmount: issueResult.funded_amount,
      };

      return {
        __typename: 'Payment',
        message: 'Thank you for funding!',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  submitAccountPayment: async args => {
    try {
      const { issueId, fundValue, organizationId, userId } = args;
      const [issueResult] = await submitAccountPaymentIssue(issueId, fundValue);
      await submitAccountPaymentOrganization(organizationId, fundValue);
      const [userResult] = await submitAccountPaymentUser(userId, fundValue);

      const activityInput = {
        actionType: 'fund',
        fundedValue: fundValue,
        issueId,
        organizationId,
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
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};

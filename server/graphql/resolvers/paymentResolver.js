/* eslint-disable consistent-return */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const {
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
} = require('../../db');
const { createActivity } = require('./activityResolver');

module.exports = {
  createPaypalPayment: async args => {
    const { amount, issueId, organizationId, userId } = args;
    try {
      if (issueId && organizationId) {
        const [issueResult] = await submitAccountPaymentIssue(issueId, amount);
        await submitAccountPaymentOrganization(organizationId, amount);

        const activityInput = {
          actionType: 'fund',
          fundedValue: amount,
          issueId,
          organizationId,
        };
        await createActivity({ activityInput });

        return {
          __typename: 'Payment',
          fundedAmount: issueResult.funded_amount,
          message: 'Your Paypal payment has been successful!',
        };
      }
      if (userId) {
        const [userResult] = await submitAccountDepositUser(userId, amount);

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
  },
  createStripeCharge: async args => {
    const { amount, issueId, organizationId, token, userId } = args;
    const totalAmount = (amount * 103.6).toFixed();
    try {
      await stripe.charges.create({
        amount: totalAmount,
        currency: 'usd',
        description: 'Customer charge',
        source: token,
      });

      if (issueId && organizationId) {
        const [issueResult] = await submitAccountPaymentIssue(issueId, amount);
        await submitAccountPaymentOrganization(organizationId, amount);

        const activityInput = {
          actionType: 'fund',
          fundedValue: amount,
          issueId,
          organizationId,
        };
        await createActivity({ activityInput });

        return {
          __typename: 'Payment',
          fundedAmount: issueResult.funded_amount,
          message: 'Thank you for funding!',
        };
      }
      if (userId) {
        const [userResult] = await submitAccountDepositUser(userId, amount);

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

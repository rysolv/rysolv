/* eslint-disable consistent-return */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { createActivity } = require('./activityResolver');
const { calculateTotalAmount } = require('../../constants');
const {
  getOneUser,
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
} = require('../../db');

module.exports = {
  createPaypalPayment: async args => {
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
  },
  createStripeCharge: async args => {
    const { amount, issueId, token, userId } = args;
    const totalAmount = calculateTotalAmount(amount);
    try {
      if (amount < 1) {
        throw new Error('Amount must be greater than $0.99');
      }
      await stripe.charges.create({
        amount: totalAmount,
        currency: 'usd',
        description: 'Customer charge',
        source: token,
      });

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
          message: 'Thank you for funding!',
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
  },
  submitAccountPayment: async args => {
    const { fundValue, issueId, userId } = args;
    try {
      if (issueId) {
        const { balance } = await getOneUser(userId);
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
  },
};

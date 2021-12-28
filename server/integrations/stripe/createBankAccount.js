/* eslint-disable consistent-return */
const production = process.env.NODE_ENV === 'production';

const STRIPE_SECRET_KEY = production
  ? process.env.STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY_TEST;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const createBankAccount = async ({ customerId, token }) => {
  await stripe.customers.createSource(customerId, { source: token });
};

module.exports = createBankAccount;

/* eslint-disable consistent-return */
const production = process.env.NODE_ENV === 'production';

const STRIPE_SECRET_KEY = production
  ? process.env.STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY_TEST;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const createStripeCustomer = async ({
  companyId,
  email,
  location,
  name,
  url,
  user,
  userId,
}) => {
  const customer = await stripe.customers.create({
    email,
    metadata: {
      companyId,
      location,
      test: !production,
      url,
      user,
      userId,
    },
    name,
  });

  return customer;
};

module.exports = createStripeCustomer;

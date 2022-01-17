/* eslint-disable consistent-return */
const production = process.env.NODE_ENV === 'production';

const STRIPE_SECRET_KEY = production
  ? process.env.STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY_TEST;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const setPaymentIntent = async ({ customerId, token }) => {
  const setupIntent = await stripe.setupIntents.create({
    confirm: true,
    customer: customerId,
    payment_method_data: {
      type: 'card',
      card: {
        token,
      },
    },
  });

  return setupIntent;
};

module.exports = setPaymentIntent;

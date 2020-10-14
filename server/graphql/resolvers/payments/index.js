const createPaypalPayment = require('./createPaypalPayment');
const createStripeCharge = require('./createStripeCharge');
const submitAccountPayment = require('./submitAccountPayment');

module.exports = {
  createPaypalPayment,
  createStripeCharge,
  submitAccountPayment,
};

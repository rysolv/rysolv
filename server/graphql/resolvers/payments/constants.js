const createPaypalPaymentError = ({ issueId }) =>
  `Something went wrong when ${
    issueId ? 'funding' : 'depositing'
  } using your Paypal account.`;

const createStripePaymentError = ({ issueId }) =>
  `Something went wrong when ${
    issueId ? 'funding' : 'depositing'
  } using your Stripe account.`;

const depositSuccess = `You have successfully deposited money into your account!`;

const greaterThanError = `Amount must be greater than $0.99`;

const paypalPaymentSuccess = `Thank you! Your Paypal payment has been successful.`;

const stripePaymentSuccess = `Thank you! Your Stripe payment has been successful.`;

module.exports = {
  createPaypalPaymentError,
  createStripePaymentError,
  depositSuccess,
  greaterThanError,
  paypalPaymentSuccess,
  stripePaymentSuccess,
};

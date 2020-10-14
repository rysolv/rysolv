import {
  CLEAR_ALERTS,
  INPUT_ERROR,
  PAYPAL_PAYMENT_FAILURE,
  PAYPAL_PAYMENT_SUCCESS,
  PAYPAL_PAYMENT,
  RESET_STATE,
  STRIPE_TOKEN_FAILURE,
  STRIPE_TOKEN_SUCCESS,
  STRIPE_TOKEN,
  SUBMIT_ACCOUNT_PAYMENT_FAILURE,
  SUBMIT_ACCOUNT_PAYMENT_SUCCESS,
  SUBMIT_ACCOUNT_PAYMENT,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

export function paypalPaymentFailure(payload) {
  return {
    payload,
    type: PAYPAL_PAYMENT_FAILURE,
  };
}

export function paypalPaymentSuccess(payload) {
  return {
    payload,
    type: PAYPAL_PAYMENT_SUCCESS,
  };
}

export function paypalPayment(payload) {
  return {
    payload,
    type: PAYPAL_PAYMENT,
  };
}

export function resetState() {
  return { type: RESET_STATE };
}

export function stripeTokenFailure(payload) {
  return {
    payload,
    type: STRIPE_TOKEN_FAILURE,
  };
}

export function stripeTokenSuccess(payload) {
  return {
    payload,
    type: STRIPE_TOKEN_SUCCESS,
  };
}

export function stripeToken(payload) {
  return {
    payload,
    type: STRIPE_TOKEN,
  };
}

export function submitAccountPaymentFailure(payload) {
  return {
    payload,
    type: SUBMIT_ACCOUNT_PAYMENT_FAILURE,
  };
}

export function submitAccountPaymentSuccess(payload) {
  return {
    payload,
    type: SUBMIT_ACCOUNT_PAYMENT_SUCCESS,
  };
}

export function submitAccountPayment(payload) {
  return {
    payload,
    type: SUBMIT_ACCOUNT_PAYMENT,
  };
}

import {
  CLEAR_ALERTS,
  INPUT_ERROR,
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

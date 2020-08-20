import {
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  CLOSE_MODAL_STATE,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  INPUT_CHANGE,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  PAYPAL_PAYMENT_FAILURE,
  PAYPAL_PAYMENT_SUCCESS,
  PAYPAL_PAYMENT,
  REMOVE_ISSUE_FAILURE,
  REMOVE_ISSUE_SUCCESS,
  REMOVE_ISSUE,
  REMOVE_WATCHING,
  SAVE_CHANGE_FAILURE,
  SAVE_CHANGE_SUCCESS,
  SAVE_CHANGE,
  STRIPE_TOKEN_FAILURE,
  STRIPE_TOKEN_SUCCESS,
  STRIPE_TOKEN,
  WITHDRAW_FUNDS_FAILURE,
  WITHDRAW_FUNDS_SUCCESS,
  WITHDRAW_FUNDS,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}

export function closeModalState() {
  return {
    type: CLOSE_MODAL_STATE,
  };
}

export function deleteUserFailure(payload) {
  return {
    payload,
    type: DELETE_USER_FAILURE,
  };
}

export function deleteUserSuccess(payload) {
  return {
    payload,
    type: DELETE_USER_SUCCESS,
  };
}

export function deleteUser(payload) {
  return {
    payload,
    type: DELETE_USER,
  };
}

export function fetchInfoFailure(payload) {
  return {
    payload,
    type: FETCH_INFO_FAILURE,
  };
}

export function fetchInfoSuccess(payload) {
  return {
    payload,
    type: FETCH_INFO_SUCCESS,
  };
}

export function fetchInfo(payload) {
  return {
    payload,
    type: FETCH_INFO,
  };
}

export function inputChange(payload) {
  return {
    payload,
    type: INPUT_CHANGE,
  };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

export function openModalState(payload) {
  return {
    payload,
    type: OPEN_MODAL_STATE,
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

export function removeIssueFailure(payload) {
  return {
    payload,
    type: REMOVE_ISSUE_FAILURE,
  };
}

export function removeIssueSuccess(payload) {
  return {
    payload,
    type: REMOVE_ISSUE_SUCCESS,
  };
}

export function removeIssue(payload) {
  return {
    payload,
    type: REMOVE_ISSUE,
  };
}

export function removeWatching(payload) {
  return {
    payload,
    type: REMOVE_WATCHING,
  };
}

export function saveChangeFailure(payload) {
  return {
    payload,
    type: SAVE_CHANGE_FAILURE,
  };
}

export function saveChangeSuccess(payload) {
  return {
    payload,
    type: SAVE_CHANGE_SUCCESS,
  };
}

export function saveChange(payload) {
  return {
    payload,
    type: SAVE_CHANGE,
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

export function withdrawFundsFailure(payload) {
  return {
    payload,
    type: WITHDRAW_FUNDS_FAILURE,
  };
}

export function withdrawFundsSuccess(payload) {
  return {
    payload,
    type: WITHDRAW_FUNDS_SUCCESS,
  };
}

export function withdrawFunds(payload) {
  return {
    payload,
    type: WITHDRAW_FUNDS,
  };
}

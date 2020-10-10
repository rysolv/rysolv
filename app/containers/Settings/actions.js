import {
  CHANGE_EMAIL_FAILURE,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL,
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
  REMOVE_ATTEMPTING,
  REMOVE_ISSUE_FAILURE,
  REMOVE_ISSUE_SUCCESS,
  REMOVE_WATCHING,
  RESET_STATE,
  SAVE_CHANGE_FAILURE,
  SAVE_CHANGE_SUCCESS,
  SAVE_CHANGE,
  STRIPE_TOKEN_FAILURE,
  STRIPE_TOKEN_SUCCESS,
  STRIPE_TOKEN,
  VERIFY_ACCOUNT_FAILURE,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT,
  WITHDRAW_FUNDS_FAILURE,
  WITHDRAW_FUNDS_SUCCESS,
  WITHDRAW_FUNDS,
} from './constants';

export function changeEmailFailure(payload) {
  return {
    payload,
    type: CHANGE_EMAIL_FAILURE,
  };
}

export function changeEmailSuccess() {
  return { type: CHANGE_EMAIL_SUCCESS };
}

export function changeEmail(payload) {
  return {
    payload,
    type: CHANGE_EMAIL,
  };
}

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

export function deleteUserSuccess() {
  return { type: DELETE_USER_SUCCESS };
}

export function deleteUser() {
  return { type: DELETE_USER };
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

export function removeAttempting(payload) {
  return {
    payload,
    type: REMOVE_ATTEMPTING,
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

export function removeWatching(payload) {
  return {
    payload,
    type: REMOVE_WATCHING,
  };
}

export function resetState() {
  return { type: RESET_STATE };
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

export function verifyAccountFailure(payload) {
  return {
    payload,
    type: VERIFY_ACCOUNT_FAILURE,
  };
}

export function verifyAccountSuccess(payload) {
  return {
    payload,
    type: VERIFY_ACCOUNT_SUCCESS,
  };
}

export function verifyAccount(payload) {
  return {
    payload,
    type: VERIFY_ACCOUNT,
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

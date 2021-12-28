import {
  CHANGE_INPUT,
  CLOSE_MODAL_STATE,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER,
  FETCH_CONTRACT_FAILURE,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT,
  FETCH_PLAID_TOKEN_FAILURE,
  FETCH_PLAID_TOKEN_SUCCESS,
  FETCH_PLAID_TOKEN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  SUBMIT_CONTRACT_ACCEPTED_FAILURE,
  SUBMIT_CONTRACT_ACCEPTED_SUCCESS,
  SUBMIT_CONTRACT_ACCEPTED,
  UPDATE_PAYMENT_METHOD_FAILURE,
  UPDATE_PAYMENT_METHOD_SUCCESS,
  UPDATE_PAYMENT_METHOD,
} from './constants';

export function changeInput(payload) {
  return {
    payload,
    type: CHANGE_INPUT,
  };
}

export function closeModalState() {
  return { type: CLOSE_MODAL_STATE };
}

export function editUserFailure(payload) {
  return {
    payload,
    type: EDIT_USER_FAILURE,
  };
}

export function editUserSuccess(payload) {
  return {
    payload,
    type: EDIT_USER_SUCCESS,
  };
}

export function editUser(payload) {
  return {
    payload,
    type: EDIT_USER,
  };
}

export function fetchContractFailure(payload) {
  return {
    payload,
    type: FETCH_CONTRACT_FAILURE,
  };
}

export function fetchContractSuccess(payload) {
  return {
    payload,
    type: FETCH_CONTRACT_SUCCESS,
  };
}

export function fetchContract(payload) {
  return {
    payload,
    type: FETCH_CONTRACT,
  };
}

export function fetchPlaidTokenFailure(payload) {
  return {
    payload,
    type: FETCH_PLAID_TOKEN_FAILURE,
  };
}

export function fetchPlaidTokenSuccess(payload) {
  return {
    payload,
    type: FETCH_PLAID_TOKEN_SUCCESS,
  };
}

export function fetchPlaidToken() {
  return { type: FETCH_PLAID_TOKEN };
}

export function fetchUserFailure(payload) {
  return {
    payload,
    type: FETCH_USER_FAILURE,
  };
}

export function fetchUserSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_SUCCESS,
  };
}

export function fetchUser(payload) {
  return {
    payload,
    type: FETCH_USER,
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

export function submitContractAcceptedFailure(payload) {
  return {
    payload,
    type: SUBMIT_CONTRACT_ACCEPTED_FAILURE,
  };
}

export function submitContractAcceptedSuccess() {
  return { type: SUBMIT_CONTRACT_ACCEPTED_SUCCESS };
}

export function submitContractAccepted(payload) {
  return {
    payload,
    type: SUBMIT_CONTRACT_ACCEPTED,
  };
}

export function updatePaymentMethodFailure(payload) {
  return {
    payload,
    type: UPDATE_PAYMENT_METHOD_FAILURE,
  };
}

export function updatePaymentMethodSuccess() {
  return { type: UPDATE_PAYMENT_METHOD_SUCCESS };
}

export function updatePaymentMethod(payload) {
  return {
    payload,
    type: UPDATE_PAYMENT_METHOD,
  };
}

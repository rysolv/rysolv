import {
  CHANGE_INPUT,
  CLOSE_MODAL_STATE,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
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

export function deleteUser() {
  return { type: DELETE_USER };
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

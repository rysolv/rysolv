import {
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT,
  UPDATE_ACTIVE_USER,
} from './constants';

export function fetchActiveUserFailure(payload) {
  return {
    payload,
    type: FETCH_ACTIVE_USER_FAILURE,
  };
}

export function fetchActiveUserSuccess(payload) {
  return {
    payload,
    type: FETCH_ACTIVE_USER_SUCCESS,
  };
}

export function fetchActiveUser(payload) {
  return {
    payload,
    type: FETCH_ACTIVE_USER,
  };
}

export function loginFailure(payload) {
  return {
    payload,
    type: LOGIN_FAILURE,
  };
}

export function loginSuccess(payload) {
  return {
    payload,
    type: LOGIN_SUCCESS,
  };
}

export function login(payload) {
  return {
    payload,
    type: LOGIN,
  };
}

export function logoutFailure(payload) {
  return {
    payload,
    type: LOGOUT_FAILURE,
  };
}

export function logoutSuccess(payload) {
  return {
    payload,
    type: LOGOUT_SUCCESS,
  };
}

export function logout(payload) {
  return {
    payload,
    type: LOGOUT,
  };
}

export function updateActiveUser(payload) {
  return {
    payload,
    type: UPDATE_ACTIVE_USER,
  };
}

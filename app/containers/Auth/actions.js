import {
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP,
  UPDATE_ACTIVE_USER,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL,
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

export function searchOrganizationsFailure(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS_FAILURE,
  };
}

export function searchOrganizationsSuccess(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS_SUCCESS,
  };
}

export function searchOrganizations(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS,
  };
}

export function signInFailure(payload) {
  return {
    payload,
    type: SIGN_IN_FAILURE,
  };
}

export function signInSuccess(payload) {
  return {
    payload,
    type: SIGN_IN_SUCCESS,
  };
}

export function signIn(payload) {
  return {
    payload,
    type: SIGN_IN,
  };
}

export function signOutFailure(payload) {
  return {
    payload,
    type: SIGN_OUT_FAILURE,
  };
}

export function signOutSuccess(payload) {
  return {
    payload,
    type: SIGN_OUT_SUCCESS,
  };
}

export function signOut(payload) {
  return {
    payload,
    type: SIGN_OUT,
  };
}

export function signUpFailure(payload) {
  return {
    payload,
    type: SIGN_UP_FAILURE,
  };
}

export function signUpSuccess(payload) {
  return {
    payload,
    type: SIGN_UP_SUCCESS,
  };
}

export function signUp(payload) {
  return {
    payload,
    type: SIGN_UP,
  };
}

export function updateActiveUser(payload) {
  return {
    payload,
    type: UPDATE_ACTIVE_USER,
  };
}

export function verifyEmailFailure(payload) {
  return {
    payload,
    type: VERIFY_EMAIL_FAILURE,
  };
}

export function verifyEmailSuccess(payload) {
  return {
    payload,
    type: VERIFY_EMAIL_SUCCESS,
  };
}

export function verifyEmail(payload) {
  return {
    payload,
    type: VERIFY_EMAIL,
  };
}

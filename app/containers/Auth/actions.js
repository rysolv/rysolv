import {
  CLEAR_ALERTS,
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  GITHUB_SIGN_IN_FAILURE,
  GITHUB_SIGN_IN_SUCCESS,
  GITHUB_SIGN_IN,
  RESEND_SIGN_UP,
  RESET_ROUTE,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN,
  SIGN_OUT_RESPONSE,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP,
  UPDATE_ACTIVE_USER,
  UPVOTE_USER_TEMP,
  USER_ATTEMPTING_TEMP,
  USER_WATCHING_TEMP,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

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

export function fetchActiveUser() {
  return { type: FETCH_ACTIVE_USER };
}

export function githubSignInFailure(payload) {
  return {
    payload,
    type: GITHUB_SIGN_IN_FAILURE,
  };
}

export function githubSignInSuccess(payload) {
  return {
    payload,
    type: GITHUB_SIGN_IN_SUCCESS,
  };
}

export function githubSignIn(payload) {
  return {
    payload,
    type: GITHUB_SIGN_IN,
  };
}

export function resendSignUp(payload) {
  return {
    payload,
    type: RESEND_SIGN_UP,
  };
}

export function resetRoute() {
  return { type: RESET_ROUTE };
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

export function signOutResponse() {
  return {
    type: SIGN_OUT_RESPONSE,
  };
}

export function signOut() {
  return {
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

export function upvoteUserTemp(payload) {
  return {
    payload,
    type: UPVOTE_USER_TEMP,
  };
}

export function userAttemptingTemp(payload) {
  return {
    payload,
    type: USER_ATTEMPTING_TEMP,
  };
}

export function userWatchingTemp(payload) {
  return {
    payload,
    type: USER_WATCHING_TEMP,
  };
}

export function verifyEmailFailure(payload) {
  return {
    payload,
    type: VERIFY_EMAIL_FAILURE,
  };
}

export function verifyEmailSuccess() {
  return { type: VERIFY_EMAIL_SUCCESS };
}

export function verifyEmail(payload) {
  return {
    payload,
    type: VERIFY_EMAIL,
  };
}

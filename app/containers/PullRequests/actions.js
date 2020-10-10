import {
  CLEAR_ALERTS,
  CLEAR_ERROR,
  CREATE_PULL_REQUEST_FAILURE,
  CREATE_PULL_REQUEST_SUCCESS,
  CREATE_PULL_REQUEST,
  DELETE_PULL_REQUEST_FAILURE,
  DELETE_PULL_REQUEST_SUCCESS,
  DELETE_PULL_REQUEST,
  FETCH_USER_PULL_REQUESTS_FAILURE,
  FETCH_USER_PULL_REQUESTS_SUCCESS,
  FETCH_USER_PULL_REQUESTS,
  HANDLE_STEP,
  IMPORT_PULL_REQUEST_FAILURE,
  IMPORT_PULL_REQUEST_SUCCESS,
  IMPORT_PULL_REQUEST,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_STATE,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export function createPullRequestFailure(payload) {
  return {
    payload,
    type: CREATE_PULL_REQUEST_FAILURE,
  };
}

export function createPullRequestSuccess() {
  return { type: CREATE_PULL_REQUEST_SUCCESS };
}

export function createPullRequest(payload) {
  return {
    payload,
    type: CREATE_PULL_REQUEST,
  };
}

export function deletePullRequestFailure(payload) {
  return {
    payload,
    type: DELETE_PULL_REQUEST_FAILURE,
  };
}

export function deletePullRequestSuccess(payload) {
  return {
    payload,
    type: DELETE_PULL_REQUEST_SUCCESS,
  };
}

export function deletePullRequest(payload) {
  return {
    payload,
    type: DELETE_PULL_REQUEST,
  };
}

export function fetchUserPullRequestsFailure(payload) {
  return {
    payload,
    type: FETCH_USER_PULL_REQUESTS_FAILURE,
  };
}

export function fetchUserPullRequestsSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_PULL_REQUESTS_SUCCESS,
  };
}

export function fetchUserPullRequests() {
  return {
    type: FETCH_USER_PULL_REQUESTS,
  };
}

export function handleStep(payload) {
  return {
    payload,
    type: HANDLE_STEP,
  };
}

export function importPullRequestFailure(payload) {
  return {
    payload,
    type: IMPORT_PULL_REQUEST_FAILURE,
  };
}

export function importPullRequestSuccess(payload) {
  return {
    payload,
    type: IMPORT_PULL_REQUEST_SUCCESS,
  };
}

export function importPullRequest(payload) {
  return {
    payload,
    type: IMPORT_PULL_REQUEST,
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

export function resetState() {
  return {
    type: RESET_STATE,
  };
}

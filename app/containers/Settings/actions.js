import {
  CLEAR_ALERTS,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  INPUT_CHANGE,
  REMOVE_ISSUE_FAILURE,
  REMOVE_ISSUE_SUCCESS,
  REMOVE_ISSUE,
  SAVE_CHANGE_FAILURE,
  SAVE_CHANGE_SUCCESS,
  SAVE_CHANGE,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
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

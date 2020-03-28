import {
  CLEAR_ALERTS,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS,
  INPUT_CHANGE,
  SEARCH_USERS_FAILURE,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS,
} from './constants';

export function fetchUsersFailure(payload) {
  return {
    payload,
    type: FETCH_USERS_FAILURE,
  };
}

export function fetchUsersSuccess(payload) {
  return {
    payload,
    type: FETCH_USERS_SUCCESS,
  };
}

export function fetchUsers() {
  return {
    type: FETCH_USERS,
  };
}

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

export function searchUsersFailure(payload) {
  return {
    payload,
    type: SEARCH_USERS_FAILURE,
  };
}

export function searchUsersSuccess(payload) {
  return {
    payload,
    type: SEARCH_USERS_SUCCESS,
  };
}
export function searchUsers(payload) {
  return {
    payload,
    type: SEARCH_USERS,
  };
}

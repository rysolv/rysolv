import {
  CHANGE_USER_FILTER,
  CHANGE_USER_SEARCH,
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

export function changeUserFilter(payload) {
  return {
    payload,
    type: CHANGE_USER_FILTER,
  };
}

export function changeUserSearch(payload) {
  return {
    payload,
    type: CHANGE_USER_SEARCH,
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

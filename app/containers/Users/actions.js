import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS,
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

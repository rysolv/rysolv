import {
  CHANGE_USER_FILTER,
  CLEAR_ALERTS,
  CLEAR_FORM,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS,
  INCREMENT_STEP,
  INPUT_CHANGE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_USERS_FAILURE,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS,
  UPDATE_INFO_FAILURE,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO,
  VERIFY_INFO,
} from './constants';

export function changeUserFilter(payload) {
  return {
    payload,
    type: CHANGE_USER_FILTER,
  };
}

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

export function clearForm() {
  return {
    type: CLEAR_FORM,
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

export function incrementStep(payload) {
  return {
    payload,
    type: INCREMENT_STEP,
  };
}

export function inputChange(payload) {
  return {
    payload,
    type: INPUT_CHANGE,
  };
}

export function saveInfoFailure(payload) {
  return {
    payload,
    type: SAVE_INFO_FAILURE,
  };
}

export function saveInfoSuccess(payload) {
  return {
    payload,
    type: SAVE_INFO_SUCCESS,
  };
}

export function saveInfo(payload) {
  return {
    payload,
    type: SAVE_INFO,
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

export function updateInfoFailure(payload) {
  return {
    payload,
    type: UPDATE_INFO_FAILURE,
  };
}

export function updateInfoSuccess(payload) {
  return {
    payload,
    type: UPDATE_INFO_SUCCESS,
  };
}

export function updateInfo(payload) {
  return {
    payload,
    type: UPDATE_INFO,
  };
}

export function verifyInfo() {
  return {
    type: VERIFY_INFO,
  };
}

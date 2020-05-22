import {
  CLEAR_ALERTS,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  INPUT_CHANGE,
  SAVE_CHANGE_FAILURE,
  SAVE_CHANGE_SUCCESS,
  SAVE_CHANGE,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
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

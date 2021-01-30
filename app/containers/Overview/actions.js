import {
  FETCH_FILTER_OPTIONS_FAILURE,
  FETCH_FILTER_OPTIONS_SUCCESS,
  FETCH_FILTER_OPTIONS,
  RESET_STATE,
} from './constants';

export function fetchFilterOptionsFailure(payload) {
  return {
    payload,
    type: FETCH_FILTER_OPTIONS_FAILURE,
  };
}

export function fetchFilterOptionsSuccess(payload) {
  return {
    payload,
    type: FETCH_FILTER_OPTIONS_SUCCESS,
  };
}

export function fetchFilterOptions() {
  return {
    type: FETCH_FILTER_OPTIONS,
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}

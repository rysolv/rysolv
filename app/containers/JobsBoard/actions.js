import {
  CHANGE_FILTER,
  FETCH_JOBS_BOARD_FAILURE,
  FETCH_JOBS_BOARD_SUCCESS,
  FETCH_JOBS_BOARD,
  RESET_FILTER,
} from './constants';

export function changeFilter(payload) {
  return {
    payload,
    type: CHANGE_FILTER,
  };
}

export function fetchJobsBoardFailure() {
  return { type: FETCH_JOBS_BOARD_FAILURE };
}

export function fetchJobsBoardSuccess(payload) {
  return {
    payload,
    type: FETCH_JOBS_BOARD_SUCCESS,
  };
}

export function fetchJobsBoard(payload) {
  return {
    payload,
    type: FETCH_JOBS_BOARD,
  };
}

export function resetFilter() {
  return { type: RESET_FILTER };
}

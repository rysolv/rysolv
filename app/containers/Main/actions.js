import {
  CLOSE_MODAL_STATE,
  FETCH_WATCH_LIST_FAILURE,
  FETCH_WATCH_LIST_SUCCESS,
  FETCH_WATCH_LIST,
  OPEN_MODAL_STATE,
} from './constants';

export function closeModalState() {
  return {
    type: CLOSE_MODAL_STATE,
  };
}

export function fetchWatchListFailure() {
  return {
    type: FETCH_WATCH_LIST_FAILURE,
  };
}

export function fetchWatchListSuccess() {
  return {
    type: FETCH_WATCH_LIST_SUCCESS,
  };
}

export function fetchWatchList(payload) {
  return {
    payload,
    type: FETCH_WATCH_LIST,
  };
}

export function openModalState(payload) {
  return {
    payload,
    type: OPEN_MODAL_STATE,
  };
}

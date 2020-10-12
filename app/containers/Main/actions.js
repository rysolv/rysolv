import {
  CLOSE_MODAL_STATE,
  FETCH_ATTEMPT_LIST_RESPONSE,
  FETCH_ATTEMPT_LIST,
  FETCH_PULL_REQUEST_LIST_RESPONSE,
  FETCH_PULL_REQUEST_LIST,
  FETCH_WATCH_LIST_RESPONSE,
  FETCH_WATCH_LIST,
  OPEN_MODAL_STATE,
  RESET_STATE,
  UPDATE_PAYMENT_MODAL,
} from './constants';

export function closeModalState() {
  return {
    type: CLOSE_MODAL_STATE,
  };
}

export function fetchAttemptListResponse() {
  return {
    type: FETCH_ATTEMPT_LIST_RESPONSE,
  };
}

export function fetchAttemptList(payload) {
  return {
    payload,
    type: FETCH_ATTEMPT_LIST,
  };
}

export function fetchPullRequestListResponse() {
  return {
    type: FETCH_PULL_REQUEST_LIST_RESPONSE,
  };
}

export function fetchPullRequestList(payload) {
  return {
    payload,
    type: FETCH_PULL_REQUEST_LIST,
  };
}

export function fetchWatchListResponse() {
  return {
    type: FETCH_WATCH_LIST_RESPONSE,
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

export function resetState() {
  return { type: RESET_STATE };
}

export function updatePaymentModal(payload) {
  return {
    payload,
    type: UPDATE_PAYMENT_MODAL,
  };
}

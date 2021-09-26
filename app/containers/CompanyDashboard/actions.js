import {
  CHANGE_FILTER,
  CHANGE_INPUT,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  FETCH_COMPANY_MATCHES_FAILURE,
  FETCH_COMPANY_MATCHES_SUCCESS,
  FETCH_COMPANY_MATCHES,
  NOTIFY_CANDIDATE_FAILURE,
  NOTIFY_CANDIDATE_SUCCESS,
  NOTIFY_CANDIDATE,
  OPEN_MODAL_STATE,
  RESET_MODAL_STATE,
  SAVE_CANDIDATE,
  SELECT_POSITION,
} from './constants';

export function changeFilter(payload) {
  return {
    payload,
    type: CHANGE_FILTER,
  };
}

export function changeInput(payload) {
  return {
    payload,
    type: CHANGE_INPUT,
  };
}

export function clearAlerts() {
  return { type: CLEAR_ALERTS };
}

export function closeModalState() {
  return { type: CLOSE_MODAL_STATE };
}

export function fetchCompanyMatchesFailure(payload) {
  return {
    payload,
    type: FETCH_COMPANY_MATCHES_FAILURE,
  };
}

export function fetchCompanyMatchesSuccess(payload) {
  return {
    payload,
    type: FETCH_COMPANY_MATCHES_SUCCESS,
  };
}

export function fetchCompanyMatches() {
  return { type: FETCH_COMPANY_MATCHES };
}

export function notifyCandidate(payload) {
  return {
    payload,
    type: NOTIFY_CANDIDATE,
  };
}

export function notifyCandidateFailure(payload) {
  return {
    payload,
    type: NOTIFY_CANDIDATE_FAILURE,
  };
}

export function notifyCandidateSuccess(payload) {
  return {
    payload,
    type: NOTIFY_CANDIDATE_SUCCESS,
  };
}

export function openModalState(payload) {
  return {
    payload,
    type: OPEN_MODAL_STATE,
  };
}

export function resetModalState() {
  return { type: RESET_MODAL_STATE };
}

export function saveCandidate(payload) {
  return {
    payload,
    type: SAVE_CANDIDATE,
  };
}

export function selectPosition(payload) {
  return {
    payload,
    type: SELECT_POSITION,
  };
}

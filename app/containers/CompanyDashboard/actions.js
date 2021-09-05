import {
  CLOSE_MODAL_STATE,
  FETCH_COMPANY_MATCHES_FAILURE,
  FETCH_COMPANY_MATCHES_SUCCESS,
  FETCH_COMPANY_MATCHES,
  OPEN_MODAL_STATE,
  SAVE_CANDIDATE,
  SELECT_POSITION,
} from './constants';

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

export function openModalState() {
  return { type: OPEN_MODAL_STATE };
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

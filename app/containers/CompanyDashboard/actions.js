import {
  CLOSE_MODAL_STATE,
  OPEN_MODAL_STATE,
  SAVE_CANDIDATE,
  SELECT_POSITION,
} from './constants';

export function closeModalState() {
  return { type: CLOSE_MODAL_STATE };
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

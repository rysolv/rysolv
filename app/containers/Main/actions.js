import { CLOSE_MODAL_STATE, OPEN_MODAL_STATE } from './constants';

export function closeModalState(payload) {
  return {
    payload,
    type: CLOSE_MODAL_STATE,
  };
}

export function openModalState(payload) {
  return {
    payload,
    type: OPEN_MODAL_STATE,
  };
}

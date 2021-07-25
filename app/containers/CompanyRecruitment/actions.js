import {
  RESET_FORM,
  SEND_FORM_FAILURE,
  SEND_FORM_SUCCESS,
  SEND_FORM,
} from './constants';

export function resetForm() {
  return { type: RESET_FORM };
}

export function sendFormFailure() {
  return { type: SEND_FORM_FAILURE };
}

export function sendFormSuccess() {
  return { type: SEND_FORM_SUCCESS };
}

export function sendForm(payload) {
  return {
    payload,
    type: SEND_FORM,
  };
}

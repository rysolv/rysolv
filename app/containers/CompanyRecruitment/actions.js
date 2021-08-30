import {
  CHANGE_INPUT,
  CHANGE_STEP,
  INPUT_ERROR,
  RESET_FORM,
  SEND_FORM_FAILURE,
  SEND_FORM_SUCCESS,
  SEND_FORM,
} from './constants';

export function changeInput(payload) {
  return {
    payload,
    type: CHANGE_INPUT,
  };
}

export function changeStep(payload) {
  return {
    payload,
    type: CHANGE_STEP,
  };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

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

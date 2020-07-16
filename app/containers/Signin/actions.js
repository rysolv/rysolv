import {
  CLEAR_FORM,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
} from './constants';

export function clearForm() {
  return {
    type: CLEAR_FORM,
  };
}

export function incrementStep(payload) {
  return {
    payload,
    type: INCREMENT_STEP,
  };
}

export function inputChange(payload) {
  return {
    payload,
    type: INPUT_CHANGE,
  };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

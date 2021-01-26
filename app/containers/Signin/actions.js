import {
  INCREMENT_RESET_STEP,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_PASSWORD_STATE,
  RESET_STATE,
} from './constants';

export function incrementResetStep(payload) {
  return {
    payload,
    type: INCREMENT_RESET_STEP,
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

export function resetPasswordState() {
  return { type: RESET_PASSWORD_STATE };
}

export function resetState() {
  return { type: RESET_STATE };
}

import {
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_STATE,
} from './constants';

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

export function resetState() {
  return {
    type: RESET_STATE,
  };
}

import {
  SUBMIT_EMAIL_FAILURE,
  SUBMIT_EMAIL_SUCCESS,
  SUBMIT_EMAIL,
} from './constants';

export function submitEmailFailure(payload) {
  return {
    payload,
    type: SUBMIT_EMAIL_FAILURE,
  };
}

export function submitEmailSuccess() {
  return { type: SUBMIT_EMAIL_SUCCESS };
}

export function submitEmail(payload) {
  return {
    payload,
    type: SUBMIT_EMAIL,
  };
}

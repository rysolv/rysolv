import {
  VERIFY_RECAPTCHA_FAILURE,
  VERIFY_RECAPTCHA_SUCCESS,
  VERIFY_RECAPTCHA,
} from './constants';

export function verifyRecaptchaFailure(payload) {
  return {
    payload,
    type: VERIFY_RECAPTCHA_FAILURE,
  };
}

export function verifyRecaptchaSuccess(payload) {
  return {
    payload,
    type: VERIFY_RECAPTCHA_SUCCESS,
  };
}

export function verifyRecaptcha(payload) {
  return {
    payload,
    type: VERIFY_RECAPTCHA,
  };
}

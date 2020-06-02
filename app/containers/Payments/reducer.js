/* eslint-disable default-case, no-param-reassign */
import produce from 'immer';

import {
  VERIFY_RECAPTCHA_FAILURE,
  VERIFY_RECAPTCHA_SUCCESS,
} from './constants';

export const initialState = {
  form: {
    isRecaptchaVerified: false,
  },
};

const paymentReducer = produce((draft, { type }) => {
  switch (type) {
    case VERIFY_RECAPTCHA_FAILURE: {
      draft.form.isRecaptchaVerified = false;
      break;
    }
    case VERIFY_RECAPTCHA_SUCCESS: {
      draft.form.isRecaptchaVerified = true;
      break;
    }
  }
}, initialState);

export default paymentReducer;

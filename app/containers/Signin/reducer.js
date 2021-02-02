/* eslint-disable array-callback-return */
import produce from 'immer';
import {
  INCREMENT_RESET_STEP,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_PASSWORD_STATE,
  RESET_STATE,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  resetPassword: {
    password: { error: '', value: '' },
    verificationCode: { error: '', value: '' },
    verifyPassword: { error: '', value: '' },
  },
  resetStep: 1,
  sendLink: {
    email: { error: '', value: '' },
  },
  signIn: {
    email: { error: '', value: '' },
    password: { error: '', value: '' },
  },
  signUp: {
    email: { error: '', value: '' },
    firstName: { error: '', value: '' },
    lastName: { error: '', value: '' },
    password: { error: '', value: '' },
    username: { error: '', value: '' },
    verifyPassword: { error: '', value: '' },
  },
  step: 2,
  verify: {
    verificationCode: { error: '', value: '' },
  },
};

/* eslint-disable consistent-return, default-case, no-param-reassign */
const signinReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case INCREMENT_RESET_STEP: {
      const { step } = payload;
      draft.resetStep = step;
      break;
    }
    case INCREMENT_STEP: {
      const { step } = payload;
      draft.step = step;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft[form][field].value = value;
      draft[form][field].error = '';
      break;
    }
    case INPUT_ERROR: {
      const { errors, form } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft[form][field].error = errors[field] || '';
      });
      break;
    }
    case RESET_PASSWORD_STATE: {
      draft.alerts = initialState.alerts;
      draft.resetPassword = initialState.resetPassword;
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
  }
}, initialState);

export default signinReducer;

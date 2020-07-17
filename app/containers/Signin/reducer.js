/* eslint-disable array-callback-return */
import produce from 'immer';
import {
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  CLEAR_FORM,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
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
  step: 1,
  verify: {
    verificationCode: { error: '', value: '' },
  },
};

/* eslint-disable default-case, no-param-reassign */
const signinReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_FORM: {
      draft.alerts = initialState.alerts;
      draft.signIn = initialState.signIn;
      draft.signUp = initialState.signUp;
      draft.step = initialState.step;
      draft.verify = initialState.verify;
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
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.data[field].error = errors[field] || '';
      });
      break;
    }
  }
}, initialState);

export default signinReducer;

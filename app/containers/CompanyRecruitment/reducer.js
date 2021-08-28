/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_INPUT,
  CHANGE_STEP,
  INPUT_ERROR,
  RESET_FORM,
  SEND_FORM_FAILURE,
  SEND_FORM_SUCCESS,
  SEND_FORM,
} from './constants';

export const initialState = {
  error: false,
  formErrors: {
    company: '',
    email: '',
    name: '',
    url: '',
  },
  form: {
    company: '',
    email: '',
    name: '',
    url: '',
  },
  loading: false,
  success: false,
  step: 2,
};

const companyRecruitmentReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { field, value } = payload;
      draft.form[field] = value;
      break;
    }
    case CHANGE_STEP: {
      const { step } = payload;
      draft.step = step;
      break;
    }
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.formErrors[field] = errors[field] || '';
      });
      break;
    }
    case RESET_FORM: {
      draft.error = initialState.error;
      draft.form = initialState.form;
      draft.formErrors = initialState.formErrors;
      draft.success = initialState.success;
      break;
    }
    case SEND_FORM_FAILURE: {
      draft.loading = false;
      draft.error = true;
      break;
    }
    case SEND_FORM_SUCCESS: {
      draft.loading = false;
      draft.success = true;
      break;
    }
    case SEND_FORM: {
      draft.error = false;
      draft.loading = true;
      draft.success = false;
      break;
    }
  }
}, initialState);

export default companyRecruitmentReducer;

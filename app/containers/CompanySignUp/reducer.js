/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_INPUT,
  CHANGE_VIEW,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  INPUT_ERROR,
  RESET_STATE,
  SUBMIT_COMPANY_RESPONSE_FAILURE,
  SUBMIT_COMPANY_RESPONSE_SUCCESS,
  SUBMIT_COMPANY_RESPONSE,
} from './constants';

export const initialState = {
  error: null,
  loading: true,
  form: {
    contractAccepted: false,
    description: '',
    location: '',
    name: '',
    size: '',
    website: '',
  },
  formErrors: {
    description: '',
    location: '',
    name: '',
    size: '',
    website: '',
  },
  questions: [],
  view: 0,
};

const companySignUpReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { field, value } = payload;
      draft.form[field] = value;
      break;
    }
    case CHANGE_VIEW: {
      const { view } = payload;
      draft.loading = false;
      draft.view = view;
      break;
    }
    case FETCH_QUESTIONS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_QUESTIONS_SUCCESS: {
      const { questions } = payload;
      draft.loading = false;
      draft.questions = questions;
      break;
    }
    case FETCH_QUESTIONS: {
      draft.error = null;
      draft.loading = true;
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
    case RESET_STATE: {
      return initialState;
    }
    case SUBMIT_COMPANY_RESPONSE_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case SUBMIT_COMPANY_RESPONSE_SUCCESS: {
      draft.loading = false;
      break;
    }
    case SUBMIT_COMPANY_RESPONSE: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default companySignUpReducer;

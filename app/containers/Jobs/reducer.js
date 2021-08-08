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
  SUBMIT_USER_RESPONSE_FAILURE,
  SUBMIT_USER_RESPONSE_SUCCESS,
  SUBMIT_USER_RESPONSE,
} from './constants';

export const initialState = {
  error: null,
  loading: true,
  form: {
    desiredRole: { value: [] },
    experience: { value: [] },
    personalLink: { value: '', error: '' },
    preferredLanguages: { value: [] },
    preferredLocation: { value: [] },
    resume: { value: [] },
    targetSalary: { value: [] },
    timeline: { value: [] },
    usCitizen: { value: '' },
  },
  questions: [],
  view: 0,
};

const jobsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { field, value } = payload;
      draft.form[field].value = value;
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
        draft.form[field].error = errors[field] || '';
      });
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
    case SUBMIT_USER_RESPONSE_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case SUBMIT_USER_RESPONSE_SUCCESS: {
      draft.loading = false;
      break;
    }
    case SUBMIT_USER_RESPONSE: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default jobsReducer;

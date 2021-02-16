/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_INPUT,
  CHANGE_VIEW,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  SUBMIT_JOB_INFO_FAILURE,
  SUBMIT_JOB_INFO_SUCCESS,
  SUBMIT_JOB_INFO,
} from './constants';

export const initialState = {
  error: null,
  loading: false,
  form: {
    desiredRole: { error: false, value: [] },
    preferredLocation: { error: false, value: [] },
    remote: { error: false, value: '' },
    targetSalary: { error: false, value: [] },
    usCitizen: { error: false, value: '' },
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
    case SUBMIT_JOB_INFO_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case SUBMIT_JOB_INFO_SUCCESS: {
      draft.loading = false;
      break;
    }
    case SUBMIT_JOB_INFO: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default jobsReducer;

/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_INPUT,
  CHANGE_VIEW,
  SUBMIT_JOB_INFO_FAILURE,
  SUBMIT_JOB_INFO_SUCCESS,
  SUBMIT_JOB_INFO,
} from './constants';

export const initialState = {
  error: null,
  loading: false,
  form: {
    citizenship: { error: false, value: '' },
    experience: { error: false, value: '' },
    isRemote: { error: false, value: '' },
    language: { error: false, value: '' },
    location: { error: false, value: '' },
    salary: { error: false, value: '' },
  },
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

/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  SUBMIT_JOB_INFO_FAILURE,
  SUBMIT_JOB_INFO_SUCCESS,
  SUBMIT_JOB_INFO,
} from './constants';

export const initialState = {
  error: null,
  loading: false,
};

const jobsReducer = produce((draft, { payload, type }) => {
  switch (type) {
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

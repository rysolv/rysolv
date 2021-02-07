/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  SUBMIT_EMAIL_FAILURE,
  SUBMIT_EMAIL_SUCCESS,
  SUBMIT_EMAIL,
} from './constants';

export const initialState = {
  error: null,
  loading: false,
};

const recruitmentReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case SUBMIT_EMAIL_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case SUBMIT_EMAIL_SUCCESS: {
      draft.loading = false;
      break;
    }
    case SUBMIT_EMAIL: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default recruitmentReducer;

/* eslint-disable consistent-return, default-case, no-param-reassign, no-unused-vars */
import produce from 'immer';

import {
  FETCH_HOME_PAGE_STATS_FAILURE,
  FETCH_HOME_PAGE_STATS_SUCCESS,
  FETCH_HOME_PAGE_STATS,
  RESET_FEEDBACK,
  SEND_CONTACT_FAILURE,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT,
} from './constants';

export const initialState = {
  error: false,
  loading: false,
  stats: {},
  success: false,
};

const homePageReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_HOME_PAGE_STATS_FAILURE: {
      draft.error = true;
      break;
    }
    case FETCH_HOME_PAGE_STATS_SUCCESS: {
      const { stats } = payload;
      draft.stats = stats;
      break;
    }
    case FETCH_HOME_PAGE_STATS: {
      draft.error = false;
      break;
    }
    case RESET_FEEDBACK: {
      draft.error = initialState.error;
      draft.loading = initialState.loading;
      draft.success = initialState.success;
      break;
    }
    case SEND_CONTACT_FAILURE: {
      draft.loading = false;
      draft.error = true;
      break;
    }
    case SEND_CONTACT_SUCCESS: {
      draft.loading = false;
      draft.success = true;
      break;
    }
    case SEND_CONTACT: {
      draft.error = false;
      draft.loading = true;
      draft.success = false;
      break;
    }
  }
}, initialState);

export default homePageReducer;

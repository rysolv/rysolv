/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_DASHBOARD_STATS_FAILURE,
  FETCH_DASHBOARD_STATS_SUCCESS,
  FETCH_DASHBOARD_STATS,
} from './constants';

export const initialState = {
  error: null,
  loading: true,
  stats: {},
};

const statsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_DASHBOARD_STATS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_DASHBOARD_STATS_SUCCESS: {
      const { stats } = payload;
      draft.loading = false;
      draft.stats = stats;
      break;
    }
    case FETCH_DASHBOARD_STATS: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default statsReducer;

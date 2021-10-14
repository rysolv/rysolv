/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  DISMISS_BANNER_FAILURE,
  DISMISS_BANNER_SUCCESS,
  DISMISS_BANNER,
  FETCH_USER_DASHBOARD_FAILURE,
  FETCH_USER_DASHBOARD_SUCCESS,
  FETCH_USER_DASHBOARD,
} from './constants';

export const initialState = {
  displayBanner: true,
  error: null,
  loading: true,
  user: {},
};

const userDashboardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case DISMISS_BANNER_FAILURE: {
      const { error } = payload;
      draft.displayBanner = false;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case DISMISS_BANNER_SUCCESS: {
      draft.loading = false;
      draft.displayBanner = false;
      break;
    }
    case DISMISS_BANNER: {
      draft.error = null;
      draft.loading = true;
      break;
    }
    case FETCH_USER_DASHBOARD_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_USER_DASHBOARD_SUCCESS: {
      const { displayBanner, user } = payload;
      draft.loading = false;
      draft.user = user;
      draft.displayBanner = displayBanner;
      break;
    }
    case FETCH_USER_DASHBOARD: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default userDashboardReducer;

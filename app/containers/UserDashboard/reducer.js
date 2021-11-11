/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_USER_DASHBOARD_FAILURE,
  FETCH_USER_DASHBOARD_SUCCESS,
  FETCH_USER_DASHBOARD,
  SET_HIRING_STATUS,
  SET_HIRING_STATUS_FAILURE,
  SET_HIRING_STATUS_SUCCESS,
} from './constants';

export const initialState = {
  error: null,
  loading: true,
  user: {},
};

const userDashboardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_USER_DASHBOARD_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_USER_DASHBOARD_SUCCESS: {
      const { user } = payload;
      draft.loading = false;
      draft.user = user;
      break;
    }
    case FETCH_USER_DASHBOARD: {
      draft.error = null;
      draft.loading = true;
      break;
    }
    case SET_HIRING_STATUS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case SET_HIRING_STATUS_SUCCESS: {
      const { hiringStatus } = payload;
      draft.loading = false;
      draft.user.hiringStatus = hiringStatus;
      break;
    }
    case SET_HIRING_STATUS: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default userDashboardReducer;

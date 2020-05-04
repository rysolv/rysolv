import produce from 'immer';

import {
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT,
  UPDATE_ACTIVE_USER,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  activeUser: {},
  isLoggedIn: true,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const authReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_ACTIVE_USER: {
      draft.loading = true;
      break;
    }
    case FETCH_ACTIVE_USER_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isLoggedIn = false;
      draft.loading = false;
      break;
    }
    case FETCH_ACTIVE_USER_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isLoggedIn = true;
      draft.loading = false;
      break;
    }
    case LOGIN: {
      draft.isLoggedIn = false;
      draft.loading = true;
      break;
    }
    case LOGIN_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isLoggedIn = false;
      draft.loading = false;
      break;
    }
    case LOGIN_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isLoggedIn = true;
      draft.loading = false;
      break;
    }
    case LOGOUT: {
      draft.loading = true;
      break;
    }
    case LOGOUT_FAILURE: {
      return initialState;
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    case UPDATE_ACTIVE_USER: {
      const { attempting } = payload;
      draft.activeUser.attempting = attempting;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default authReducer;

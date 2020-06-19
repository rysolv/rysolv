import produce from 'immer';

import {
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN,
  SIGNOUT_FAILURE,
  SIGNOUT_SUCCESS,
  SIGNOUT,
  UPDATE_ACTIVE_USER,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  activeUser: {},
  isSignedIn: false,
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
      draft.isSignedIn = false;
      draft.loading = false;
      break;
    }
    case FETCH_ACTIVE_USER_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isSignedIn = true;
      draft.loading = false;
      break;
    }
    case SEARCH_ORGANIZATIONS: {
      draft.loading = true;
      break;
    }
    case SEARCH_ORGANIZATIONS_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case SEARCH_ORGANIZATIONS_SUCCESS: {
      const { organizations } = payload;
      draft.activeUser.organizations = organizations;
      draft.loading = false;
      break;
    }
    case SIGNIN: {
      draft.isSignedIn = false;
      draft.loading = true;
      break;
    }
    case SIGNIN_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isSignedIn = false;
      draft.loading = false;
      break;
    }
    case SIGNIN_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isSignedIn = true;
      draft.loading = false;
      break;
    }
    case SIGNOUT: {
      draft.loading = true;
      break;
    }
    case SIGNOUT_FAILURE: {
      return initialState;
    }
    case SIGNOUT_SUCCESS: {
      return initialState;
    }
    case UPDATE_ACTIVE_USER: {
      const { attempting, balance } = payload;
      if (attempting) {
        draft.activeUser.attempting = attempting;
      }
      if (balance) {
        draft.activeUser.balance = balance;
      }
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default authReducer;

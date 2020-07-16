import produce from 'immer';

import {
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP,
  UPDATE_ACTIVE_USER,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL,
} from './constants';

export const initialState = {
  activeUser: {},
  alerts: { error: false, success: false },
  error: {
    signUp: { error: false, message: '' },
    verifyEmail: { error: false, message: '' },
  },
  isSignedIn: false,
  loading: false,
  verificationSent: false,
  verifyUserId: '',
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
    case SIGN_IN: {
      draft.isSignedIn = false;
      draft.loading = true;
      break;
    }
    case SIGN_IN_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isSignedIn = false;
      draft.loading = false;
      break;
    }
    case SIGN_IN_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isSignedIn = true;
      draft.loading = false;
      break;
    }
    case SIGN_OUT: {
      draft.loading = true;
      break;
    }
    case SIGN_OUT_FAILURE: {
      return initialState;
    }
    case SIGN_OUT_SUCCESS: {
      return initialState;
    }
    case SIGN_UP: {
      draft.isSignedIn = false;
      draft.loading = true;
      break;
    }
    case SIGN_UP_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;

      draft.error.signUp.error = true;
      draft.error.signUp.message = error.message;

      draft.isSignedIn = false;
      draft.loading = false;
      break;
    }
    case SIGN_UP_SUCCESS: {
      const { createUser } = payload;
      draft.activeUser = createUser;
      draft.error = initialState.error;
      draft.loading = false;
      draft.verificationSent = true;
      break;
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
    case VERIFY_EMAIL: {
      draft.loading = true;
      break;
    }
    case VERIFY_EMAIL_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;

      draft.error.verifyEmail.error = true;
      draft.error.verifyEmail.message = error.message;

      draft.isSignedIn = false;
      draft.loading = false;
      break;
    }
    case VERIFY_EMAIL_SUCCESS: {
      draft.error = initialState.error;
      draft.loading = false;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default authReducer;

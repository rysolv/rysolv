import produce from 'immer';

import { isBlank } from 'utils/validate';

import {
  CLEAR_ALERTS,
  CLEAR_STATE,
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  FETCH_USER_SESSION_FAILURE,
  FETCH_USER_SESSION_SUCCESS,
  FETCH_USER_SESSION,
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
    signIn: { error: false, message: '' },
    verifyEmail: { error: false, message: '' },
  },
  isSignedIn: false,
  loading: {
    authenticateUser: true,
    fetchActiveUser: false,
    searchOrganizations: false,
    signIn: false,
    signOut: false,
    signUp: false,
    verifyEmail: false,
  },
  verificationSent: false,
  verifyUserId: '',
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const authReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.error = initialState.error;
      break;
    }
    case CLEAR_STATE: {
      const { state } = payload || {};
      if (state) {
        draft[state] = initialState[state];
      } else {
        return initialState;
      }
      break;
    }
    case FETCH_ACTIVE_USER: {
      draft.loading.fetchActiveUser = true;
      break;
    }
    case FETCH_ACTIVE_USER_FAILURE: {
      const { error } = payload;
      draft.error.signIn.error = true;
      draft.error.signIn.message = error.message;
      draft.isSignedIn = false;
      draft.loading.fetchActiveUser = false;
      break;
    }
    case FETCH_ACTIVE_USER_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isSignedIn = true;
      draft.loading.fetchActiveUser = false;
      break;
    }
    case FETCH_USER_SESSION: {
      draft.loading.authenticateUser = true;
      break;
    }
    case FETCH_USER_SESSION_FAILURE: {
      draft.isSignedIn = false;
      draft.loading.authenticateUser = false;
      break;
    }
    case FETCH_USER_SESSION_SUCCESS: {
      draft.isSignedIn = true;
      draft.loading.authenticateUser = false;
      break;
    }
    case SEARCH_ORGANIZATIONS: {
      draft.loading.searchOrganizations = true;
      break;
    }
    case SEARCH_ORGANIZATIONS_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.searchOrganizations = false;
      break;
    }
    case SEARCH_ORGANIZATIONS_SUCCESS: {
      const { organizations } = payload;
      draft.activeUser.organizations = organizations;
      draft.loading.searchOrganizations = false;
      break;
    }
    case SIGN_IN: {
      draft.isSignedIn = false;
      draft.loading.signIn = true;
      break;
    }
    case SIGN_IN_FAILURE: {
      const { error } = payload;
      draft.error.signIn.error = true;
      draft.error.signIn.message = error.message;

      draft.isSignedIn = false;
      draft.loading.signIn = false;
      break;
    }
    case SIGN_IN_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isSignedIn = true;
      draft.loading.signIn = false;
      break;
    }
    case SIGN_OUT: {
      draft.loading.signOut = true;
      draft.loading.authenticateUser = true;
      break;
    }
    case SIGN_OUT_FAILURE: {
      const tempState = { ...initialState };
      tempState.loading.authenticateUser = false;
      return tempState;
    }
    case SIGN_OUT_SUCCESS: {
      const tempState = { ...initialState };
      tempState.loading.authenticateUser = false;
      return tempState;
    }
    case SIGN_UP: {
      draft.error = initialState.error;
      draft.isSignedIn = false;
      draft.loading.signUp = true;
      break;
    }
    case SIGN_UP_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;

      draft.error.signUp.error = true;
      draft.error.signUp.message = error.message;

      draft.isSignedIn = false;
      draft.loading.signUp = false;
      break;
    }
    case SIGN_UP_SUCCESS: {
      const { createUser } = payload;
      draft.activeUser = createUser;
      draft.loading.signUp = false;
      draft.verificationSent = true;
      break;
    }
    case UPDATE_ACTIVE_USER: {
      const { attempting, balance, profilePic } = payload;
      if (attempting) {
        draft.activeUser.attempting = attempting;
      }
      if (!isBlank(balance)) {
        draft.activeUser.balance = balance;
      }
      if (profilePic) {
        draft.activeUser.profilePic = profilePic;
      }
      break;
    }
    case VERIFY_EMAIL: {
      draft.loading.verifyEmail = true;
      break;
    }
    case VERIFY_EMAIL_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;

      draft.error.verifyEmail.error = true;
      draft.error.verifyEmail.message = error.message;

      draft.isSignedIn = false;
      draft.loading.verifyEmail = false;
      break;
    }
    case VERIFY_EMAIL_SUCCESS: {
      draft.error = initialState.error;
      draft.loading.verifyEmail = false;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default authReducer;

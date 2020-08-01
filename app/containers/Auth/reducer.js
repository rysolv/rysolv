import produce from 'immer';
import remove from 'lodash/remove';

import { isBlank } from 'utils/validate';

import {
  CLEAR_ALERTS,
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  FETCH_USER_SESSION_FAILURE,
  FETCH_USER_SESSION_SUCCESS,
  FETCH_USER_SESSION,
  RESEND_SIGN_UP,
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
  UPVOTE_USER_TEMP,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL,
} from './constants';

export const initialState = {
  activeUser: {},
  alerts: { error: false, success: false },
  isSignedIn: false,
  loading: {
    auth: false,
    authenticateUser: true,
  },
  verifyUserId: '',
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const authReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case FETCH_ACTIVE_USER: {
      draft.loading.auth = true;
      break;
    }
    case FETCH_ACTIVE_USER_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isSignedIn = false;
      draft.loading.auth = false;
      break;
    }
    case FETCH_ACTIVE_USER_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isSignedIn = true;
      draft.loading.auth = false;
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
    case RESEND_SIGN_UP: {
      draft.alerts = initialState.alerts;
      draft.isSignedIn = false;
      draft.loading.auth = true;
      break;
    }
    case SEARCH_ORGANIZATIONS: {
      draft.loading.auth = true;
      break;
    }
    case SEARCH_ORGANIZATIONS_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.auth = false;
      break;
    }
    case SEARCH_ORGANIZATIONS_SUCCESS: {
      const { organizations } = payload;
      draft.activeUser.organizations = organizations;
      draft.loading.auth = false;
      break;
    }
    case SIGN_IN: {
      draft.isSignedIn = false;
      draft.loading.auth = true;
      break;
    }
    case SIGN_IN_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isSignedIn = false;
      draft.loading.auth = false;
      break;
    }
    case SIGN_IN_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.isSignedIn = true;
      draft.loading.auth = false;
      break;
    }
    case SIGN_OUT: {
      draft.loading.auth = true;
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
      draft.alerts = initialState.alerts;
      draft.isSignedIn = false;
      draft.loading.auth = true;
      break;
    }
    case SIGN_UP_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isSignedIn = false;
      draft.loading.auth = false;
      break;
    }
    case SIGN_UP_SUCCESS: {
      const { createUser } = payload;
      draft.activeUser = createUser;
      draft.loading.auth = false;
      break;
    }
    case UPDATE_ACTIVE_USER: {
      const {
        addUpvote,
        attempting,
        balance,
        profilePic,
        removeUpvote,
        rep,
      } = payload;
      if (addUpvote && rep) {
        draft.activeUser.upvotes.push(addUpvote);
        draft.activeUser.rep = rep;
      }
      if (attempting) {
        draft.activeUser.attempting = attempting;
      }
      if (!isBlank(balance)) {
        draft.activeUser.balance = balance;
      }
      if (profilePic) {
        draft.activeUser.profilePic = profilePic;
      }
      if (removeUpvote && rep) {
        remove(draft.activeUser.upvotes, id => id === removeUpvote);
        draft.activeUser.rep = rep;
      }
      break;
    }
    case UPVOTE_USER_TEMP: {
      const { issueId, upvote } = payload;
      if (upvote) {
        draft.activeUser.rep -= 1;
        draft.activeUser.upvotes.push(issueId);
      } else {
        draft.activeUser.rep += 1;
        remove(draft.activeUser.upvotes, id => id === issueId);
      }
      break;
    }
    case VERIFY_EMAIL: {
      draft.alerts = initialState.alerts;
      draft.loading.auth = true;
      break;
    }
    case VERIFY_EMAIL_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isSignedIn = false;
      draft.loading.auth = false;
      break;
    }
    case VERIFY_EMAIL_SUCCESS: {
      draft.loading.auth = false;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default authReducer;

/* eslint-disable default-case, no-param-reassign, consistent-return */
import produce from 'immer';
import remove from 'lodash/remove';

import { isBlank } from 'utils/validate';

import {
  CLEAR_ALERTS,
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  FETCH_ACTIVE_USER,
  GITHUB_SIGN_IN_FAILURE,
  GITHUB_SIGN_IN_SUCCESS,
  GITHUB_SIGN_IN,
  RESEND_SIGN_UP,
  RESET_ROUTE,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN,
  SIGN_OUT_RESPONSE,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP,
  UPDATE_ACTIVE_USER,
  UPVOTE_USER_TEMP,
  USER_ATTEMPTING_TEMP,
  USER_WATCHING_TEMP,
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
  route: {
    signIn: false,
    signUp: false,
  },
  verifyUserId: '',
};

const authReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case FETCH_ACTIVE_USER_FAILURE: {
      draft.isSignedIn = false;
      draft.loading.auth = false;
      draft.loading.authenticateUser = false;
      break;
    }
    case FETCH_ACTIVE_USER_SUCCESS: {
      const { user } = payload;
      draft.activeUser = user;
      draft.isSignedIn = true;
      draft.loading.auth = false;
      draft.loading.authenticateUser = false;
      break;
    }
    case FETCH_ACTIVE_USER: {
      draft.loading.auth = true;
      break;
    }
    case GITHUB_SIGN_IN_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.isSignedIn = false;
      draft.loading.auth = false;
      break;
    }
    case GITHUB_SIGN_IN_SUCCESS: {
      const { user } = payload;
      draft.activeUser = user;
      draft.isSignedIn = true;
      draft.loading.auth = false;
      break;
    }
    case GITHUB_SIGN_IN: {
      draft.isSignedIn = false;
      draft.loading.auth = true;
      break;
    }
    case RESEND_SIGN_UP: {
      draft.alerts = initialState.alerts;
      draft.isSignedIn = false;
      draft.loading.auth = true;
      break;
    }
    case RESET_ROUTE: {
      draft.route = initialState.route;
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
      const { user } = payload;
      draft.activeUser = user;
      draft.isSignedIn = true;
      draft.loading.auth = false;
      draft.route.signIn = true;
      break;
    }
    case SIGN_IN: {
      draft.isSignedIn = false;
      draft.loading.auth = true;
      break;
    }
    case SIGN_OUT_RESPONSE: {
      const tempState = { ...initialState };
      tempState.loading.authenticateUser = false;
      return tempState;
    }
    case SIGN_OUT: {
      draft.loading.auth = true;
      draft.loading.authenticateUser = true;
      break;
    }
    case SIGN_UP_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.auth = false;
      break;
    }
    case SIGN_UP_SUCCESS: {
      const { activeUser } = payload;
      draft.activeUser = activeUser;
      draft.loading.auth = false;
      break;
    }
    case SIGN_UP: {
      draft.alerts = initialState.alerts;
      draft.loading.auth = true;
      break;
    }
    case UPDATE_ACTIVE_USER: {
      const {
        addUpvote,
        attempting,
        balance,
        isGithubVerified,
        profilePic,
        pullRequestId,
        removeUpvote,
        rep,
        watching,
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
      if (isGithubVerified) {
        draft.activeUser.isGithubVerified = isGithubVerified;
      }
      if (profilePic) {
        draft.activeUser.profilePic = profilePic;
      }
      if (pullRequestId) {
        remove(draft.activeUser.pullRequests, id => id === pullRequestId);
      }
      if (removeUpvote && rep) {
        remove(draft.activeUser.upvotes, id => id === removeUpvote);
        draft.activeUser.rep = rep;
      }
      if (watching) {
        draft.activeUser.watching = watching;
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
    case USER_ATTEMPTING_TEMP: {
      const { issueId } = payload;
      const issueIndex = draft.activeUser.attempting
        .map(el => el.id)
        .indexOf(issueId);
      if (issueIndex > -1) {
        draft.activeUser.attempting.splice(issueIndex, 1);
      } else {
        draft.activeUser.attempting.push({ id: issueId });
      }
      break;
    }
    case USER_WATCHING_TEMP: {
      const { issueId } = payload;
      const issueIndex = draft.activeUser.watching
        .map(el => el.id)
        .indexOf(issueId);
      if (issueIndex > -1) {
        draft.activeUser.watching.splice(issueIndex, 1);
      } else {
        draft.activeUser.watching.push({ id: issueId });
      }
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
      draft.isSignedIn = true;
      draft.loading.auth = false;
      draft.route.signUp = true;
      break;
    }
    case VERIFY_EMAIL: {
      draft.alerts = initialState.alerts;
      draft.isSignedIn = false;
      draft.loading.auth = true;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default authReducer;

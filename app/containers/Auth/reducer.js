/* eslint-disable default-case, no-param-reassign, consistent-return */
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
  RESET_ROUTE,
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
  isVerifyRoute: false,
  loading: {
    auth: false,
    authenticateUser: true,
  },
  verifyUserId: '',
};

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
    case RESET_ROUTE: {
      draft.isVerifyRoute = initialState.isVerifyRoute;
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
      const { activeUser } = payload;
      draft.activeUser = activeUser;
      draft.loading.auth = false;
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
      draft.isVerifyRoute = true;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default authReducer;

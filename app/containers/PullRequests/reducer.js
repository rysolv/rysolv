/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import remove from 'lodash/remove';

import {
  CLEAR_ALERTS,
  CREATE_PULL_REQUEST_FAILURE,
  CREATE_PULL_REQUEST_SUCCESS,
  CREATE_PULL_REQUEST,
  DELETE_PULL_REQUEST_FAILURE,
  DELETE_PULL_REQUEST_SUCCESS,
  DELETE_PULL_REQUEST,
  FETCH_GITHUB_PULL_REQUESTS_FAILURE,
  FETCH_GITHUB_PULL_REQUESTS_SUCCESS,
  FETCH_GITHUB_PULL_REQUESTS,
  FETCH_USER_PULL_REQUESTS_FAILURE,
  FETCH_USER_PULL_REQUESTS_SUCCESS,
  FETCH_USER_PULL_REQUESTS,
  HANDLE_STEP,
  IMPORT_PULL_REQUEST_FAILURE,
  IMPORT_PULL_REQUEST_SUCCESS,
  IMPORT_PULL_REQUEST,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_STATE,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  createSuccess: false,
  error: null,
  importData: {
    githubUsername: { error: '', value: '' },
    htmlUrl: { error: '', value: '' },
    importUrl: { error: '', value: '' },
    mergeable: { error: '', value: null },
    mergeableState: { error: '', value: '' },
    merged: { error: '', value: null },
    open: { error: '', value: null },
    pullNumber: { error: '', value: '' },
    title: { error: '', value: '' },
  },
  importSuccess: false,
  loading: {
    default: false,
    userPullRequests: false,
  },
  pullRequests: [],
  step: 1,
  userPullRequests: [],
};

const pullRequestReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case CREATE_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.default = false;
      break;
    }
    case CREATE_PULL_REQUEST_SUCCESS: {
      draft.createSuccess = true;
      draft.loading.default = false;
      draft.step = 3;
      break;
    }
    case CREATE_PULL_REQUEST: {
      draft.alerts = initialState.alerts;
      draft.loading.default = true;
      break;
    }
    case DELETE_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.default = false;
      break;
    }
    case DELETE_PULL_REQUEST_SUCCESS: {
      const { id, message } = payload;
      draft.alerts.success = { message };
      remove(draft.pullRequests, ({ pullRequestId }) => pullRequestId === id);
      draft.loading.default = false;
      break;
    }
    case DELETE_PULL_REQUEST: {
      draft.loading.default = true;
      break;
    }
    case FETCH_GITHUB_PULL_REQUESTS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.userPullRequests = false;
      break;
    }
    case FETCH_GITHUB_PULL_REQUESTS_SUCCESS: {
      const { pullRequestArray } = payload;
      draft.loading.userPullRequests = false;
      draft.userPullRequests = pullRequestArray;
      break;
    }
    case FETCH_GITHUB_PULL_REQUESTS: {
      draft.loading.userPullRequests = true;
      break;
    }
    case FETCH_USER_PULL_REQUESTS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.default = false;
      break;
    }
    case FETCH_USER_PULL_REQUESTS_SUCCESS: {
      const { pullRequestArray } = payload;
      draft.loading.default = false;
      draft.pullRequests = pullRequestArray;
      break;
    }
    case FETCH_USER_PULL_REQUESTS: {
      draft.loading.default = true;
      break;
    }
    case HANDLE_STEP: {
      const { step } = payload;
      draft.step = step;
      break;
    }
    case IMPORT_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.default = false;
      break;
    }
    case IMPORT_PULL_REQUEST_SUCCESS: {
      const { pullRequest } = payload;
      draft.importSuccess = true;
      draft.loading.default = false;
      draft.step = 2;

      Object.keys(draft.importData).map(field => {
        draft.importData[field].value = pullRequest[field];
      });

      break;
    }
    case IMPORT_PULL_REQUEST: {
      draft.alerts = initialState.alerts;
      draft.loading.default = true;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft[form][field].error = '';
      draft[form][field].value = value.trim();
      break;
    }
    case INPUT_ERROR: {
      const { error } = payload;
      const fields = Object.keys(error);
      fields.forEach(field => {
        draft.importData[field].error = error[field] || '';
      });
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
  }
}, initialState);

export default pullRequestReducer;

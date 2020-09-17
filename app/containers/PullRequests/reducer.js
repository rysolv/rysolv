/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import remove from 'lodash/remove';

import {
  CLEAR_ALERTS,
  CLEAR_ERROR,
  CREATE_PULL_REQUEST_FAILURE,
  CREATE_PULL_REQUEST_SUCCESS,
  CREATE_PULL_REQUEST,
  DELETE_PULL_REQUEST_FAILURE,
  DELETE_PULL_REQUEST_SUCCESS,
  DELETE_PULL_REQUEST,
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
    status: { error: '', value: '' },
    title: { error: '', value: '' },
  },
  importSuccess: false,
  loading: false,
  pullRequests: [],
  step: 1,
};

const pullRequestReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case CLEAR_ERROR: {
      draft.error = initialState.error;
      break;
    }
    case CREATE_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case CREATE_PULL_REQUEST_SUCCESS: {
      draft.loading = false;
      draft.createSuccess = true;
      draft.step = 3;
      break;
    }
    case CREATE_PULL_REQUEST: {
      draft.loading = true;
      break;
    }
    case DELETE_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case DELETE_PULL_REQUEST_SUCCESS: {
      const { id, message } = payload;
      draft.alerts.success = { message };
      remove(draft.pullRequests, ({ pullRequestId }) => pullRequestId === id);
      draft.loading = false;
      break;
    }
    case DELETE_PULL_REQUEST: {
      draft.loading = true;
      break;
    }
    case FETCH_USER_PULL_REQUESTS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_USER_PULL_REQUESTS_SUCCESS: {
      const data = payload;
      draft.loading = false;
      draft.pullRequests = data;
      break;
    }
    case FETCH_USER_PULL_REQUESTS: {
      draft.loading = true;
      break;
    }
    case HANDLE_STEP: {
      const { step } = payload;
      draft.step = step;
      break;
    }
    case IMPORT_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case IMPORT_PULL_REQUEST_SUCCESS: {
      const { importPullRequest } = payload;
      draft.importSuccess = true;
      draft.step = 2;
      draft.loading = false;

      Object.keys(draft.importData).map(field => {
        draft.importData[field].value = importPullRequest[field];
      });

      break;
    }
    case IMPORT_PULL_REQUEST: {
      draft.loading = true;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft.error = initialState.error;

      draft[form][field].error = '';
      draft[form][field].value = value;
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

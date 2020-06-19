/* eslint-disable array-callback-return */
import produce from 'immer';

import {
  CLEAR_FORM,
  CREATE_PULL_REQUEST_FAILURE,
  CREATE_PULL_REQUEST_SUCCESS,
  CREATE_PULL_REQUEST,
  FETCH_USER_PULL_REQUESTS_FAILURE,
  FETCH_USER_PULL_REQUESTS_SUCCESS,
  FETCH_USER_PULL_REQUESTS,
  HANDLE_STEP,
  IMPORT_PULL_REQUEST_FAILURE,
  IMPORT_PULL_REQUEST_SUCCESS,
  IMPORT_PULL_REQUEST,
  INPUT_CHANGE,
  INPUT_ERROR,
} from './constants';

export const initialState = {
  createSuccess: false,
  error: {
    createPullRequest: null,
    fetchPullRequests: null,
    importPullRequest: null,
  },
  importSuccess: false,
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
  loading: {
    createPullRequest: false,
    fetchPullRequests: false,
    importPullRequest: false,
  },
  pullRequests: [],
  step: 1,
};

/* eslint-disable default-case, no-param-reassign */
const pullRequestReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_FORM: {
      draft.createSuccess = initialState.createSuccess;
      draft.error = initialState.error;
      draft.importData = initialState.importData;
      draft.importSuccess = initialState.importSuccess;
      draft.pullRequests = initialState.pullRequests;
      draft.step = initialState.step;
      break;
    }
    case CREATE_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.error.createPullRequest = error;
      draft.loading.createPullRequest = false;
      break;
    }
    case CREATE_PULL_REQUEST_SUCCESS: {
      draft.loading.createPullRequest = false;
      draft.createSuccess = true;
      draft.step = 3;
      break;
    }
    case CREATE_PULL_REQUEST: {
      draft.loading.createPullRequest = true;
      break;
    }
    case FETCH_USER_PULL_REQUESTS_FAILURE: {
      const { error } = payload;
      draft.error.fetchPullRequests = error;
      draft.loading.fetchPullRequests = false;
      break;
    }
    case FETCH_USER_PULL_REQUESTS_SUCCESS: {
      const data = payload;
      draft.loading.fetchPullRequests = false;
      draft.pullRequests = data;
      break;
    }
    case FETCH_USER_PULL_REQUESTS: {
      draft.loading.fetchPullRequests = true;
      break;
    }
    case HANDLE_STEP: {
      const { step } = payload;
      draft.step = step;
      break;
    }
    case IMPORT_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.error.importPullRequest = error;
      draft.loading.importPullRequest = false;
      break;
    }
    case IMPORT_PULL_REQUEST_SUCCESS: {
      const { importPullRequest } = payload;
      draft.importSuccess = true;
      draft.step = 2;
      draft.loading.importPullRequest = false;

      Object.keys(draft.importData).map(field => {
        draft.importData[field].value = importPullRequest[field];
      });

      break;
    }
    case IMPORT_PULL_REQUEST: {
      draft.loading.importPullRequest = true;
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
  }
}, initialState);

export default pullRequestReducer;

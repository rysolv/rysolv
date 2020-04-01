import produce from 'immer';
import remove from 'lodash/remove';

import {
  CLEAR_ALERTS,
  DELETE_ISSUE_FAILURE,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES,
  INPUT_CHANGE,
  SEARCH_ISSUES_FAILURE,
  SEARCH_ISSUES_SUCCESS,
  SEARCH_ISSUES,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  error: {
    issues: false,
    searchIssues: false,
  },
  issues: [],
  loading: {
    deleteIssue: false,
    issues: false,
    searchIssues: false,
  },
  search: {
    searchInput: { error: '', value: '' },
  },
};

/* eslint-disable default-case, no-param-reassign */
const issuesReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case DELETE_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deleteIssue = false;
      break;
    }
    case DELETE_ISSUE_SUCCESS: {
      const { itemId, message } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteIssue = false;
      remove(draft.issues, ({ id }) => id === itemId);
      break;
    }
    case DELETE_ISSUE: {
      draft.loading.deleteIssue = true;
      break;
    }
    case FETCH_ISSUES_FAILURE: {
      const { error } = payload;
      draft.error.issues = error;
      draft.loading.issues = false;
      break;
    }
    case FETCH_ISSUES_SUCCESS: {
      draft.issues = payload;
      draft.loading.issues = false;
      break;
    }
    case FETCH_ISSUES: {
      draft.loading.issues = true;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft[form][field].value = value;
      break;
    }
    case SEARCH_ISSUES_FAILURE: {
      const { error } = payload;
      draft.error.searchIssues = error;
      draft.loading.searchIssues = false;
      break;
    }
    case SEARCH_ISSUES_SUCCESS: {
      const { issues } = payload;
      draft.issues = issues || null;
      draft.loading.searchIssues = false;
      break;
    }
    case SEARCH_ISSUES: {
      draft.loading.searchIssues = true;
      break;
    }
  }
}, initialState);

export default issuesReducer;

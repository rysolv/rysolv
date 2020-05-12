/* eslint-disable array-callback-return */
import produce from 'immer';
import remove from 'lodash/remove';

import {
  ADD_ATTEMPT_FAILURE,
  ADD_ATTEMPT_SUCCESS,
  ADD_ATTEMPT,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT,
  ADD_WATCH_FAILURE,
  ADD_WATCH_SUCCESS,
  CHANGE_ISSUE_FILTER,
  CLEAR_ALERTS,
  CLEAR_FORM,
  DELETE_ISSUE_FAILURE,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE,
  FETCH_ISSUE_DETAIL_FAILURE,
  FETCH_ISSUE_DETAIL_SUCCESS,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_ISSUES_FAILURE,
  SEARCH_ISSUES_SUCCESS,
  SEARCH_ISSUES,
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE,
  VERIFY_INFO,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  data: {
    name: { error: '', value: '' },
    body: { error: '', value: '' },
    language: { error: '', value: [] },
    importUrl: { error: '', value: '' },
  },
  error: {
    issues: false,
    searchIssues: false,
    issueDetail: false,
  },
  filter: {
    language: [],
    organization: [],
    price: [0, 5000],
    status: {
      closed: false,
      funded: false,
      unfunded: false,
    },
    type: {
      bug: false,
      feature: false,
    },
  },
  issueDetail: {},
  issues: [],
  isVerified: false,
  loading: {
    addAttempt: false,
    addComment: false,
    addIssue: false,
    addWatch: false,
    deleteIssue: false,
    issueDetail: false,
    issues: false,
    searchIssues: false,
    upvoteIssue: false,
  },
  organizationData: {
    organizationId: { error: '', value: '' },
    organizationUrl: { error: '', value: '' },
    organizationDescription: { error: '', value: '' },
    organizationRepo: { error: '', value: '' },
    importUrl: { error: '', value: '' },
    organizationName: { error: '', value: '' },
  },
  search: {
    searchInput: { error: '', value: '' },
  },
  step: {
    addIssue: 1,
    editIssue: 1,
  },
};

/* eslint-disable default-case, no-param-reassign */
const issuesReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case ADD_ATTEMPT_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.addAttempt = false;
      break;
    }
    case ADD_ATTEMPT_SUCCESS: {
      const { attempting } = payload;
      draft.issueDetail.attempting = attempting;
      draft.loading.addAttempt = false;
      break;
    }
    case ADD_ATTEMPT: {
      draft.loading.addAttempt = true;
      break;
    }
    case ADD_COMMENT_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.addComment = false;
      break;
    }
    case ADD_COMMENT_SUCCESS: {
      const { createComment } = payload;
      draft.issueDetail.comments.push(createComment);
      draft.loading.addComment = false;
      break;
    }
    case ADD_WATCH_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.addWatch = false;
      break;
    }
    case ADD_WATCH_SUCCESS: {
      const { id, watching } = payload;
      draft.issues.map((issue, index) => {
        if (issue.id === id) {
          draft.issues[index].watching = watching;
        }
      });
      if (draft.issueDetail) {
        draft.issueDetail.watching = watching;
      }
      draft.loading.addWatch = false;
      break;
    }
    case ADD_COMMENT: {
      draft.loading.addComment = true;
      break;
    }
    case CHANGE_ISSUE_FILTER: {
      const { field, value } = payload;
      if (field === 'language' || field === 'organization') {
        draft.filter[field] = [];
        value.map(language => draft.filter[field].push(language.value));
      } else if (field === 'status' || field === 'type') {
        const formattedValue = value.toLowerCase();
        draft.filter[field][formattedValue] = !draft.filter[field][
          formattedValue
        ];
      } else {
        draft.filter[field] = value;
      }
      break;
    }
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case CLEAR_FORM: {
      draft.data = initialState.data;
      draft.organizationData = initialState.organizationData;
      draft.isVerified = initialState.isVerified;
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
    case FETCH_ISSUE_DETAIL_FAILURE: {
      const { error } = payload;
      draft.error.issueDetail = error;
      draft.loading.issueDetail = false;
      break;
    }
    case FETCH_ISSUE_DETAIL_SUCCESS: {
      const { oneIssue } = payload;
      draft.issueDetail = oneIssue;
      draft.loading.issueDetail = false;
      break;
    }
    case FETCH_ISSUE_DETAIL: {
      draft.loading.issueDetail = true;
      break;
    }
    case INCREMENT_STEP: {
      const { step, view } = payload;
      draft.step[view] = step;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      if (form === 'filter') {
        draft[form][field] = value;
      } else if (field === 'language') {
        draft[form][field].value = [];
        value.map(language => draft[form][field].value.push(language.value));
      } else {
        draft[form][field].value = value;
      }
      break;
    }
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.data[field].error = errors[field] || '';
      });
      break;
    }
    case SAVE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.addIssue = false;
      break;
    }
    case SAVE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.addIssue = false;
      break;
    }
    case SAVE_INFO: {
      draft.loading.addIssue = true;
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
    case UPVOTE_ISSUE: {
      draft.loading.upvoteIssue = true;
      break;
    }
    case UPVOTE_ISSUE_SUCCESS: {
      const { id, rep } = payload;
      draft.issues.map((issue, index) => {
        if (issue.id === id) {
          draft.issues[index].rep = rep;
        }
      });
      if (draft.issueDetail) {
        draft.issueDetail.rep = rep;
      }
      draft.loading.upvoteIssue = false;
      break;
    }
    case UPVOTE_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.upvoteIssue = false;
      break;
    }
    case VERIFY_INFO: {
      draft.isVerified = !draft.isVerified;
      break;
    }
  }
}, initialState);

export default issuesReducer;

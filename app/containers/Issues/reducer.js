/* eslint-disable array-callback-return */
import produce from 'immer';

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
  CHANGE_ISSUE_SEARCH,
  CLEAR_ALERTS,
  CLEAR_FORM,
  CLEAR_ORGANIZATION,
  CLOSE_ISSUE_FAILURE,
  CLOSE_ISSUE_SUCCESS,
  CLOSE_ISSUE,
  CLOSE_MODAL_STATE,
  EDIT_ISSUE_FAILURE,
  EDIT_ISSUE_SUCCESS,
  EDIT_ISSUE,
  FETCH_ISSUE_DETAIL_FAILURE,
  FETCH_ISSUE_DETAIL_SUCCESS,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES,
  IMPORT_ISSUE_FAILURE,
  IMPORT_ISSUE_SUCCESS,
  IMPORT_ISSUE,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_ISSUES_FAILURE,
  SEARCH_ISSUES_SUCCESS,
  SEARCH_ISSUES,
  SUBMIT_ACCOUNT_PAYMENT_FAILURE,
  SUBMIT_ACCOUNT_PAYMENT_SUCCESS,
  SUBMIT_ACCOUNT_PAYMENT,
  UPDATE_ISSUE_DETAIL,
  UPDATE_ORGANIZATION,
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE_TEMP,
  UPVOTE_ISSUE,
  VERIFY_INFO,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  issueData: {
    issueName: { error: '', value: '' },
    issueBody: { error: '', value: '' },
    issueUrl: { error: '', value: '' },
    issueLanguages: { error: '', value: [] },
    importUrl: { error: '', value: '' },
  },
  error: {
    importIssue: { error: false, message: '' },
    issueDetail: false,
    issues: false,
    searchIssues: false,
    submitAccountPayment: false,
  },
  filter: {
    language: [],
    organization: [],
    overview: 'Newest',
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
  importSuccess: false,
  isModalOpen: false,
  issueDetail: {},
  issues: [],
  isVerified: false,
  loading: {
    addAttempt: false,
    addComment: false,
    addIssue: false,
    addWatch: false,
    closeIssue: false,
    importIssue: false,
    issueDetail: false,
    issues: false,
    searchIssues: false,
    submitAccountPayment: false,
    upvoteIssue: false,
  },
  modal: '',
  organizationData: {
    importUrl: { error: '', value: '' },
    organizationDescription: { error: '', value: '' },
    organizationId: { error: '', value: '' },
    organizationLogo: { error: '', value: '' },
    organizationName: { error: '', value: '' },
    organizationRepo: { error: '', value: '' },
    organizationUrl: { error: '', value: '' },
  },
  paymentAlerts: { error: false, success: false },
  search: {
    overviewInput: { error: '', value: '' },
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
        value.map(language => draft.filter[field].push(language));
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
    case CHANGE_ISSUE_SEARCH: {
      const { field, value } = payload;
      draft.search[field].value = value;
      break;
    }
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      draft.filter = initialState.filter;
      draft.paymentAlerts = initialState.paymentAlerts;
      draft.search = initialState.search;
      break;
    }
    case CLEAR_FORM: {
      draft.error = initialState.error;
      draft.issueData = initialState.issueData;
      draft.importSuccess = initialState.importSuccess;
      draft.organizationData = initialState.organizationData;
      draft.isVerified = initialState.isVerified;
      break;
    }
    case CLEAR_ORGANIZATION: {
      draft.organizationData = initialState.organizationData;
      break;
    }
    case CLOSE_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.closeIssue = false;
      break;
    }
    case CLOSE_ISSUE_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.closeIssue = false;
      draft.issueDetail.open = !draft.issueDetail.open;
      break;
    }
    case CLOSE_ISSUE: {
      draft.loading.closeIssue = true;
      break;
    }
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = initialState.isModalOpen;
      draft.modal = initialState.modal;
      break;
    }
    case EDIT_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.editIssue = false;
      break;
    }
    case EDIT_ISSUE_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.editIssue = false;
      break;
    }
    case EDIT_ISSUE: {
      draft.loading.editIssue = true;
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
    case IMPORT_ISSUE_FAILURE: {
      const { error } = payload;
      draft.error.importIssue = { error: true, message: error.message };
      draft.loading.importIssue = false;
      break;
    }
    case IMPORT_ISSUE_SUCCESS: {
      const { importIssue } = payload;
      draft.loading.importIssue = false;
      Object.keys(draft.issueData).map(field => {
        draft.issueData[field].value = importIssue[field];
      });
      Object.keys(draft.organizationData).map(field => {
        draft.organizationData[field].value = importIssue[field];
      });
      draft.importSuccess = true;
      break;
    }
    case IMPORT_ISSUE: {
      draft.loading.importIssue = true;
      break;
    }
    case INCREMENT_STEP: {
      const { step, view } = payload;
      draft.step[view] = step;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft.error = initialState.error;
      draft[form][field].error = '';

      if (form === 'filter') {
        draft[form][field] = value;
      } else if (field === 'issueLanguages') {
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
        draft.issueData[field].error = errors[field] || '';
      });
      break;
    }
    case OPEN_MODAL_STATE: {
      const { modalState } = payload;
      draft.isModalOpen = true;
      draft.modal = modalState;
      break;
    }
    case SAVE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = { message: error };
      draft.importSuccess = false;
      draft.loading.addIssue = false;
      break;
    }
    case SAVE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.addIssue = false;
      draft.importSuccess = false;
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
      draft.importSuccess = false;
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
    case SUBMIT_ACCOUNT_PAYMENT_FAILURE: {
      const { error } = payload;
      draft.loading.submitAccountPayment = false;
      draft.paymentAlerts.submitAccountPayment = error;
      break;
    }
    case SUBMIT_ACCOUNT_PAYMENT_SUCCESS: {
      const { fundedAmount, isFundedFromOverview, issueId, message } = payload;
      if (!isFundedFromOverview) {
        draft.issueDetail.fundedAmount = fundedAmount;
      }
      draft.issues.map(issue => {
        const { id } = issue;
        if (id === issueId) issue.fundedAmount = fundedAmount;
      });
      draft.loading.submitAccountPayment = false;
      draft.paymentAlerts.success = { message };
      break;
    }
    case SUBMIT_ACCOUNT_PAYMENT: {
      draft.loading.submitAccountPayment = true;
      break;
    }
    case UPDATE_ISSUE_DETAIL: {
      const { pullRequestId } = payload;
      draft.issueDetail.pullRequests.push(pullRequestId);
      break;
    }
    case UPDATE_ORGANIZATION: {
      draft.organizationData = payload;
      break;
    }
    case UPVOTE_ISSUE: {
      draft.loading.upvoteIssue = true;
      break;
    }
    case UPVOTE_ISSUE_SUCCESS: {
      const { issueId, issueRep } = payload;
      draft.issues.map(({ id }, index) => {
        if (id === issueId) {
          draft.issues[index].rep = issueRep;
        }
      });
      if (draft.issueDetail.id) {
        draft.issueDetail.rep = issueRep;
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
    case UPVOTE_ISSUE_TEMP: {
      const { issueId, upvote } = payload;
      draft.issues.map(({ id }, index) => {
        if (id === issueId) {
          // eslint-disable-next-line no-unused-expressions
          upvote
            ? (draft.issues[index].rep += 1)
            : (draft.issues[index].rep -= 1);
        }
      });
      if (draft.issueDetail.id) {
        // eslint-disable-next-line no-unused-expressions
        upvote ? (draft.issueDetail.rep += 1) : (draft.issueDetail.rep -= 1);
      }
      break;
    }
    case VERIFY_INFO: {
      draft.isVerified = !draft.isVerified;
      break;
    }
  }
}, initialState);

export default issuesReducer;

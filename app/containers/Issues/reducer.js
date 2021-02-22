/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import Identicon from 'identicon.js';

import {
  ADD_ATTEMPT_FAILURE,
  ADD_ATTEMPT_SUCCESS,
  ADD_ATTEMPT,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT,
  ADD_WATCH_FAILURE,
  ADD_WATCH_SUCCESS,
  ADD_WATCH,
  CHANGE_ISSUE_FILTER,
  CHANGE_ISSUE_SEARCH,
  CLEAR_ALERTS,
  CLEAR_FORM,
  CLEAR_REPO,
  CLOSE_ISSUE_FAILURE,
  CLOSE_ISSUE_SUCCESS,
  CLOSE_ISSUE,
  CLOSE_MODAL_STATE,
  DELETE_PULL_REQUEST_FAILURE,
  DELETE_PULL_REQUEST_SUCCESS,
  DELETE_PULL_REQUEST,
  EDIT_ISSUE_FAILURE,
  EDIT_ISSUE_SUCCESS,
  EDIT_ISSUE,
  FETCH_ISSUE_DETAIL_FAILURE,
  FETCH_ISSUE_DETAIL_SUCCESS,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES,
  FETCH_USER_ISSUES_FAILURE,
  FETCH_USER_ISSUES_SUCCESS,
  FETCH_USER_ISSUES,
  GENERATE_IDENTICON,
  IMPORT_ISSUE_FAILURE,
  IMPORT_ISSUE_SUCCESS,
  IMPORT_ISSUE,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  RESET_STATE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_ISSUES_FAILURE,
  SEARCH_ISSUES_SUCCESS,
  SEARCH_ISSUES,
  UPDATE_FUNDED_ISSUE,
  UPDATE_IS_MANUAL,
  UPDATE_ISSUE_DETAIL,
  UPDATE_REPO,
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE_TEMP,
  UPVOTE_ISSUE,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  issueData: {
    autoImportUrl: { error: '', value: '' },
    githubCommentCount: { error: '', value: 0 },
    importUrl: { error: '', value: '' },
    issueBody: { error: '', value: '' },
    issueLanguages: { error: '', value: [] },
    issueName: { error: '', value: '' },
    issueUrl: { error: '', value: '' },
  },
  error: {
    importIssue: { error: false, message: '' },
    issueDetail: false,
    issues: false,
    searchIssues: false,
    submitAccountPayment: false,
    userIssues: false,
  },
  filter: {
    language: [],
    overview: 'Most Funded',
    price: [0, 5000],
    repo: [],
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
  isManual: false,
  isModalOpen: false,
  isNotFound: false,
  issueDetail: {},
  issues: [],
  loading: {
    addAttempt: false,
    addComment: false,
    addIssue: false,
    addWatch: false,
    closeIssue: false,
    deletePullRequest: false,
    importIssue: false,
    issueDetail: false,
    issues: false,
    searchIssues: false,
    submitAccountPayment: false,
    upvoteIssue: false,
  },
  modal: '',
  repoData: {
    identiconId: { error: '', value: '' },
    importUrl: { error: '', value: '' },
    organizationDescription: { error: '', value: '' },
    organizationId: { error: '', value: '' },
    organizationLanguages: { error: '', value: '' },
    organizationLogo: { error: '', value: '' },
    organizationName: { error: '', value: '' },
    organizationRepo: { error: '', value: '' },
    organizationUrl: { error: '', value: '' },
  },
  search: {
    overviewInput: { error: '', value: '' },
    searchInput: { error: '', value: '' },
  },
  step: {
    addIssue: 1,
    editIssue: 1,
  },
  userIssues: [],
};

const issuesReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case ADD_ATTEMPT_FAILURE: {
      const { error, userId } = payload;
      draft.alerts.error = error;
      if (draft.issueDetail.id) {
        const userIdIndex = draft.issueDetail.attempting.indexOf(userId);
        if (userIdIndex > -1) {
          draft.issueDetail.attempting.splice(userIdIndex, 1);
        } else {
          draft.issueDetail.attempting.push(userId);
        }
      }
      draft.loading.addAttempt = false;
      break;
    }
    case ADD_ATTEMPT_SUCCESS: {
      const { issueId, userArray } = payload;
      draft.issues.map((issue, index) => {
        if (issue.id === issueId) {
          draft.issues[index].attempting = userArray;
        }
      });
      if (draft.issueDetail.id) {
        draft.issueDetail.attempting = userArray;
      }
      draft.loading.addAttempt = false;
      break;
    }
    case ADD_ATTEMPT: {
      const { userId } = payload;
      if (draft.issueDetail.id) {
        const userIdIndex = draft.issueDetail.attempting.indexOf(userId);
        if (userIdIndex > -1) {
          draft.issueDetail.attempting.splice(userIdIndex, 1);
        } else {
          draft.issueDetail.attempting.push(userId);
        }
      }
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
    case ADD_COMMENT: {
      draft.loading.addComment = true;
      break;
    }
    case ADD_WATCH_FAILURE: {
      const { error, issueId, userId } = payload;
      draft.alerts.error = error;
      draft.issues.map(({ id }, index) => {
        if (id === issueId) {
          const userIdIndex = draft.issues[index].watching.indexOf(userId);
          if (userIdIndex > -1) {
            draft.issues[index].watching.splice(userIdIndex, 1);
          } else {
            draft.issues[index].watching.push(userId);
          }
        }
      });
      if (draft.issueDetail.id) {
        const userIdIndex = draft.issueDetail.watching.indexOf(userId);
        if (userIdIndex > -1) {
          draft.issueDetail.watching.splice(userIdIndex, 1);
        } else {
          draft.issueDetail.watching.push(userId);
        }
      }
      draft.loading.addWatch = false;
      break;
    }
    case ADD_WATCH_SUCCESS: {
      const { issueId, userArray } = payload;
      draft.issues.map((issue, index) => {
        if (issue.id === issueId) {
          draft.issues[index].watching = userArray;
        }
      });
      if (draft.issueDetail.id) {
        draft.issueDetail.watching = userArray;
      }
      draft.loading.addWatch = false;
      break;
    }
    case ADD_WATCH: {
      const { issueId, userId } = payload;
      draft.issues.map(({ id }, index) => {
        if (id === issueId) {
          const userIdIndex = draft.issues[index].watching.indexOf(userId);
          if (userIdIndex > -1) {
            draft.issues[index].watching.splice(userIdIndex, 1);
          } else {
            draft.issues[index].watching.push(userId);
          }
        }
      });
      if (draft.issueDetail.id) {
        const userIdIndex = draft.issueDetail.watching.indexOf(userId);
        if (userIdIndex > -1) {
          draft.issueDetail.watching.splice(userIdIndex, 1);
        } else {
          draft.issueDetail.watching.push(userId);
        }
      }
      draft.loading.addWatch = true;
      break;
    }
    case CHANGE_ISSUE_FILTER: {
      const { field, value } = payload;
      if (field === 'language' || field === 'repo') {
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
      draft.search = initialState.search;
      break;
    }
    case CLEAR_FORM: {
      draft.error = initialState.error;
      draft.importSuccess = initialState.importSuccess;
      draft.issueData = initialState.issueData;
      draft.repoData = initialState.repoData;
      break;
    }
    case CLEAR_REPO: {
      draft.repoData = initialState.repoData;
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
    case DELETE_PULL_REQUEST_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deletePullRequest = false;
      break;
    }
    case DELETE_PULL_REQUEST_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.issueDetail.pullRequests -= 1;
      draft.loading.deletePullRequest = false;
      break;
    }
    case DELETE_PULL_REQUEST: {
      draft.loading.deletePullRequest = true;
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
      draft.alerts = initialState.alerts;
      draft.loading.editIssue = true;
      break;
    }
    case FETCH_ISSUE_DETAIL_FAILURE: {
      const { error, isNotFound } = payload;
      draft.error.issueDetail = error.message;
      draft.isNotFound = isNotFound;
      draft.loading.issueDetail = false;
      break;
    }
    case FETCH_ISSUE_DETAIL_SUCCESS: {
      const { issueDetail } = payload;
      draft.issueDetail = issueDetail;
      draft.loading.issueDetail = false;
      break;
    }
    case FETCH_ISSUE_DETAIL: {
      draft.loading.issueDetail = true;
      break;
    }
    case FETCH_ISSUES_FAILURE: {
      const { error } = payload;
      draft.error.issues = error;
      draft.loading.issues = false;
      break;
    }
    case FETCH_ISSUES_SUCCESS: {
      const { issues } = payload;
      draft.issues = issues;
      draft.loading.issues = false;
      break;
    }
    case FETCH_ISSUES: {
      draft.loading.issues = true;
      break;
    }
    case FETCH_USER_ISSUES_FAILURE: {
      draft.error.userIssues = true;
      draft.loading.userIssues = false;
      break;
    }
    case FETCH_USER_ISSUES_SUCCESS: {
      const { issues } = payload;
      draft.loading.userIssues = false;
      draft.userIssues = issues;
      break;
    }
    case FETCH_USER_ISSUES: {
      draft.loading.userIssues = true;
      break;
    }
    case GENERATE_IDENTICON: {
      const identiconId = uuidv4();
      const identicon = new Identicon(identiconId, 250).toString();
      draft.repoData.identiconId.value = identiconId;
      draft.repoData.organizationLogo.value = `data:image/png;base64,${identicon}`;
      break;
    }
    case IMPORT_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.issueData.autoImportUrl.error = error;
      draft.issueData.autoImportUrl.value = '';
      draft.loading.importIssue = false;
      break;
    }
    case IMPORT_ISSUE_SUCCESS: {
      const { importIssue } = payload;
      draft.loading.importIssue = false;
      Object.keys(draft.issueData).map(field => {
        draft.issueData[field].value = importIssue[field];
      });
      Object.keys(draft.repoData).map(field => {
        draft.repoData[field].value = importIssue[field];
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
    case RESET_STATE: {
      return initialState;
    }
    case SAVE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.importSuccess = false;
      draft.loading.addIssue = false;
      break;
    }
    case SAVE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.importSuccess = false;
      draft.loading.addIssue = false;
      break;
    }
    case SAVE_INFO: {
      draft.loading.addIssue = true;
      break;
    }
    case SEARCH_ISSUES_FAILURE: {
      draft.loading.searchIssues = false;
      break;
    }
    case SEARCH_ISSUES_SUCCESS: {
      const { issues } = payload;
      draft.issues = issues;
      draft.loading.searchIssues = false;
      break;
    }
    case SEARCH_ISSUES: {
      draft.loading.searchIssues = true;
      break;
    }
    case UPDATE_FUNDED_ISSUE: {
      const { fundedAmount, isFundedFromOverview, issueId } = payload;
      if (!isFundedFromOverview) {
        draft.issueDetail.fundedAmount = fundedAmount;
      }
      draft.issues.map(issue => {
        const { id } = issue;
        if (id === issueId) issue.fundedAmount = fundedAmount;
      });
      break;
    }
    case UPDATE_IS_MANUAL: {
      const { value } = payload;
      draft.isManual = value;
      break;
    }
    case UPDATE_ISSUE_DETAIL: {
      draft.issueDetail.pullRequests += 1;
      break;
    }
    case UPDATE_REPO: {
      const { repoData } = payload;
      Object.keys(draft.repoData).map(field => {
        if (payload[field]) {
          draft.repoData[field].value = repoData[field].value;
        }
      });
      break;
    }
    case UPVOTE_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.upvoteIssue = false;
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
    case UPVOTE_ISSUE: {
      draft.alerts = initialState.alerts;
      draft.loading.upvoteIssue = true;
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
  }
}, initialState);

export default issuesReducer;

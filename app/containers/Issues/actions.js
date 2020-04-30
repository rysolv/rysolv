import {
  UPDATE_ARRAY,
  ADD_ATTEMPT_FAILURE,
  ADD_ATTEMPT_SUCCESS,
  ADD_WATCH_FAILURE,
  ADD_WATCH_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
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

export function updateArray(payload) {
  return {
    payload,
    type: UPDATE_ARRAY,
  };
}

export function addAttemptFailure(payload) {
  return {
    payload,
    type: ADD_ATTEMPT_FAILURE,
  };
}

export function addAttemptSuccess(payload) {
  return {
    payload,
    type: ADD_ATTEMPT_SUCCESS,
  };
}

export function addComment(payload) {
  return {
    payload,
    type: ADD_COMMENT,
  };
}

export function addCommentFailure(payload) {
  return {
    payload,
    type: ADD_COMMENT_FAILURE,
  };
}

export function addCommentSuccess(payload) {
  return {
    payload,
    type: ADD_COMMENT_SUCCESS,
  };
}

export function addWatchFailure(payload) {
  return {
    payload,
    type: ADD_WATCH_FAILURE,
  };
}

export function addWatchSuccess(payload) {
  return {
    payload,
    type: ADD_WATCH_SUCCESS,
  };
}

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

export function clearForm() {
  return {
    type: CLEAR_FORM,
  };
}

export function deleteIssueFailure(payload) {
  return {
    payload,
    type: DELETE_ISSUE_FAILURE,
  };
}

export function deleteIssueSuccess(payload) {
  return {
    payload,
    type: DELETE_ISSUE_SUCCESS,
  };
}

export function deleteIssue(payload) {
  return {
    payload,
    type: DELETE_ISSUE,
  };
}

export function fetchIssuesFailure(payload) {
  return {
    payload,
    type: FETCH_ISSUES_FAILURE,
  };
}

export function fetchIssuesSuccess(payload) {
  return {
    payload,
    type: FETCH_ISSUES_SUCCESS,
  };
}

export function fetchIssues() {
  return {
    type: FETCH_ISSUES,
  };
}

export function fetchIssueDetailFailure(payload) {
  return {
    payload,
    type: FETCH_ISSUE_DETAIL_FAILURE,
  };
}

export function fetchIssueDetailSuccess(payload) {
  return {
    payload,
    type: FETCH_ISSUE_DETAIL_SUCCESS,
  };
}

export function fetchIssueDetail(payload) {
  return {
    payload,
    type: FETCH_ISSUE_DETAIL,
  };
}

export function incrementStep(payload) {
  return {
    payload,
    type: INCREMENT_STEP,
  };
}

export function inputChange(payload) {
  return {
    payload,
    type: INPUT_CHANGE,
  };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

export function saveInfoFailure(payload) {
  return {
    payload,
    type: SAVE_INFO_FAILURE,
  };
}

export function saveInfoSuccess(payload) {
  return {
    payload,
    type: SAVE_INFO_SUCCESS,
  };
}

export function saveInfo(payload) {
  return {
    payload,
    type: SAVE_INFO,
  };
}
export function searchIssuesFailure(payload) {
  return {
    payload,
    type: SEARCH_ISSUES_FAILURE,
  };
}

export function searchIssuesSuccess(payload) {
  return {
    payload,
    type: SEARCH_ISSUES_SUCCESS,
  };
}

export function searchIssues(payload) {
  return {
    payload,
    type: SEARCH_ISSUES,
  };
}

export function upvoteIssue(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE,
  };
}

export function upvoteIssueFailure(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE_FAILURE,
  };
}

export function upvoteIssueSuccess(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE_SUCCESS,
  };
}

export function verifyInfo() {
  return { type: VERIFY_INFO };
}

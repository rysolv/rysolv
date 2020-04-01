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

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
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

export function inputChange(payload) {
  return {
    payload,
    type: INPUT_CHANGE,
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

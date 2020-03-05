import {
  CLEAR_ALERTS,
  FETCH_ISSUE_DETAIL_FAILURE,
  FETCH_ISSUE_DETAIL_SUCCESS,
  FETCH_ISSUE_DETAIL,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
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

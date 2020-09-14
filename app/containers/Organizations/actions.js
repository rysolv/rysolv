import {
  CHANGE_ORGANIZATION_FILTER,
  CHANGE_ORGANIZATION_SEARCH,
  CLEAR_ALERTS,
  CLEAR_FORM,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS,
  GENERATE_IDENTICON,
  IMPORT_ORGANIZATION_FAILURE,
  IMPORT_ORGANIZATION_SUCCESS,
  IMPORT_ORGANIZATION,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_STATE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  UPDATE_INFO_FAILURE,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO,
  UPDATE_IS_MANUAL,
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE_TEMP,
  UPVOTE_ISSUE,
} from './constants';

export function changeOrganizationFilter(payload) {
  return {
    payload,
    type: CHANGE_ORGANIZATION_FILTER,
  };
}

export function changeOrganizationSearch(payload) {
  return {
    payload,
    type: CHANGE_ORGANIZATION_SEARCH,
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

export function fetchOrganizationsFailure(payload) {
  return {
    payload,
    type: FETCH_ORGANIZATIONS_FAILURE,
  };
}

export function fetchOrganizationsSuccess(payload) {
  return {
    payload,
    type: FETCH_ORGANIZATIONS_SUCCESS,
  };
}

export function fetchOrganizations() {
  return {
    type: FETCH_ORGANIZATIONS,
  };
}

export function fetchInfoFailure(payload) {
  return {
    payload,
    type: FETCH_INFO_FAILURE,
  };
}

export function fetchInfoSuccess(payload) {
  return {
    payload,
    type: FETCH_INFO_SUCCESS,
  };
}

export function fetchInfo(payload) {
  return {
    payload,
    type: FETCH_INFO,
  };
}

export function generateIdenticon() {
  return { type: GENERATE_IDENTICON };
}

export function importOrganizationFailure(payload) {
  return {
    payload,
    type: IMPORT_ORGANIZATION_FAILURE,
  };
}

export function importOrganizationSuccess(payload) {
  return {
    payload,
    type: IMPORT_ORGANIZATION_SUCCESS,
  };
}

export function importOrganization(payload) {
  return {
    payload,
    type: IMPORT_ORGANIZATION,
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

export function resetState() {
  return { type: RESET_STATE };
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

export function searchOrganizationsFailure(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS_FAILURE,
  };
}

export function searchOrganizationsSuccess(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS_SUCCESS,
  };
}

export function searchOrganizations(payload) {
  return {
    payload,
    type: SEARCH_ORGANIZATIONS,
  };
}

export function updateInfoFailure(payload) {
  return {
    payload,
    type: UPDATE_INFO_FAILURE,
  };
}

export function updateInfoSuccess(payload) {
  return {
    payload,
    type: UPDATE_INFO_SUCCESS,
  };
}

export function updateInfo(payload) {
  return {
    payload,
    type: UPDATE_INFO,
  };
}

export function updateIsManual(payload) {
  return {
    payload,
    type: UPDATE_IS_MANUAL,
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

export function upvoteIssueTemp(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE_TEMP,
  };
}

export function upvoteIssue(payload) {
  return {
    payload,
    type: UPVOTE_ISSUE,
  };
}

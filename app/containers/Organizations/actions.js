import {
  CHANGE_REPO_FILTER,
  CHANGE_REPO_SEARCH,
  CLEAR_ALERTS,
  CLEAR_FORM,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS,
  FETCH_USER_REPOS_FAILURE,
  FETCH_USER_REPOS_SUCCESS,
  FETCH_USER_REPOS,
  GENERATE_IDENTICON,
  IMPORT_REPO_FAILURE,
  IMPORT_REPO_SUCCESS,
  IMPORT_REPO,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_STATE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_REPOS_FAILURE,
  SEARCH_REPOS_SUCCESS,
  SEARCH_REPOS,
  UPDATE_INFO_FAILURE,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO,
  UPDATE_IS_MANUAL,
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE_TEMP,
  UPVOTE_ISSUE,
} from './constants';

export function changeRepoFilter(payload) {
  return {
    payload,
    type: CHANGE_REPO_FILTER,
  };
}

export function changeRepoSearch(payload) {
  return {
    payload,
    type: CHANGE_REPO_SEARCH,
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

export function fetchReposFailure(payload) {
  return {
    payload,
    type: FETCH_REPOS_FAILURE,
  };
}

export function fetchReposSuccess(payload) {
  return {
    payload,
    type: FETCH_REPOS_SUCCESS,
  };
}

export function fetchRepos() {
  return { type: FETCH_REPOS };
}

export function fetchUserReposFailure() {
  return { type: FETCH_USER_REPOS_FAILURE };
}

export function fetchUserReposSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_REPOS_SUCCESS,
  };
}

export function fetchUserRepos() {
  return { type: FETCH_USER_REPOS };
}

export function generateIdenticon() {
  return { type: GENERATE_IDENTICON };
}

export function importRepoFailure(payload) {
  return {
    payload,
    type: IMPORT_REPO_FAILURE,
  };
}

export function importRepoSuccess(payload) {
  return {
    payload,
    type: IMPORT_REPO_SUCCESS,
  };
}

export function importRepo(payload) {
  return {
    payload,
    type: IMPORT_REPO,
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

export function searchReposFailure() {
  return { type: SEARCH_REPOS_FAILURE };
}

export function searchReposSuccess(payload) {
  return {
    payload,
    type: SEARCH_REPOS_SUCCESS,
  };
}

export function searchRepos(payload) {
  return {
    payload,
    type: SEARCH_REPOS,
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

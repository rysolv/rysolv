import {
  FETCH_USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE,
} from './constants';

export function fetchUserProfileFailure(payload) {
  return {
    payload,
    type: FETCH_USER_PROFILE_FAILURE,
  };
}

export function fetchUserProfileSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_PROFILE_SUCCESS,
  };
}

export function fetchUserProfile(payload) {
  return {
    payload,
    type: FETCH_USER_PROFILE,
  };
}

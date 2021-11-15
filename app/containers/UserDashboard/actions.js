import {
  FETCH_USER_DASHBOARD_FAILURE,
  FETCH_USER_DASHBOARD_SUCCESS,
  FETCH_USER_DASHBOARD,
  SET_HIRING_STATUS,
  SET_HIRING_STATUS_FAILURE,
  SET_HIRING_STATUS_SUCCESS,
} from './constants';

export function fetchUserDashboardFailure(payload) {
  return {
    payload,
    type: FETCH_USER_DASHBOARD_FAILURE,
  };
}

export function fetchUserDashboardSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_DASHBOARD_SUCCESS,
  };
}

export function fetchUserDashboard(payload) {
  return {
    payload,
    type: FETCH_USER_DASHBOARD,
  };
}

export function setHiringStatusFailure(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS_FAILURE,
  };
}

export function setHiringStatusSuccess(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS_SUCCESS,
  };
}

export function setHiringStatus(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS,
  };
}

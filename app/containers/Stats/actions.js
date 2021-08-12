import {
  FETCH_DASHBOARD_STATS_FAILURE,
  FETCH_DASHBOARD_STATS_SUCCESS,
  FETCH_DASHBOARD_STATS,
} from './constants';

export function fetchDashboardStatsFailure(payload) {
  return {
    payload,
    type: FETCH_DASHBOARD_STATS_FAILURE,
  };
}

export function fetchDashboardStatsSuccess(payload) {
  return {
    payload,
    type: FETCH_DASHBOARD_STATS_SUCCESS,
  };
}

export function fetchDashboardStats(payload) {
  return {
    payload,
    type: FETCH_DASHBOARD_STATS,
  };
}

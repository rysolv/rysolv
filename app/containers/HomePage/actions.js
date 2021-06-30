import {
  FETCH_HOME_PAGE_STATS_FAILURE,
  FETCH_HOME_PAGE_STATS_SUCCESS,
  FETCH_HOME_PAGE_STATS,
  RESET_FEEDBACK,
  SEND_CONTACT_FAILURE,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT,
} from './constants';

export function fetchHomePageStatsFailure() {
  return { type: FETCH_HOME_PAGE_STATS_FAILURE };
}

export function fetchHomePageStatsSuccess(payload) {
  return {
    payload,
    type: FETCH_HOME_PAGE_STATS_SUCCESS,
  };
}

export function fetchHomePageStats() {
  return { type: FETCH_HOME_PAGE_STATS };
}

export function resetFeedback() {
  return { type: RESET_FEEDBACK };
}

export function sendContactFailure() {
  return { type: SEND_CONTACT_FAILURE };
}

export function sendContactSuccess() {
  return { type: SEND_CONTACT_SUCCESS };
}

export function sendContact(payload) {
  return {
    payload,
    type: SEND_CONTACT,
  };
}

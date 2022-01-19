import {
  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY,
  FETCH_POSITION_DETAIL_FAILURE,
  FETCH_POSITION_DETAIL_SUCCESS,
  FETCH_POSITION_DETAIL,
} from './constants';

export function fetchCompanyFailure() {
  return { type: FETCH_COMPANY_FAILURE };
}

export function fetchCompanySuccess(payload) {
  return {
    payload,
    type: FETCH_COMPANY_SUCCESS,
  };
}

export function fetchCompany(payload) {
  return {
    payload,
    type: FETCH_COMPANY,
  };
}

export function fetchPositionDetailFailure() {
  return { type: FETCH_POSITION_DETAIL_FAILURE };
}

export function fetchPositionDetailSuccess(payload) {
  return {
    payload,
    type: FETCH_POSITION_DETAIL_SUCCESS,
  };
}

export function fetchPositionDetail(payload) {
  return {
    payload,
    type: FETCH_POSITION_DETAIL,
  };
}

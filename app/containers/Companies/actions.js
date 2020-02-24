import {
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES,
} from './constants';

export function fetchCompaniesFailure(payload) {
  return {
    payload,
    type: FETCH_COMPANIES_FAILURE,
  };
}

export function fetchCompaniesSuccess(payload) {
  return {
    payload,
    type: FETCH_COMPANIES_SUCCESS,
  };
}

export function fetchCompanies() {
  return {
    type: FETCH_COMPANIES,
  };
}

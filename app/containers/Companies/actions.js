import {
  CLEAR_ALERTS,
  DELETE_COMPANY_FAILURE,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY,
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES,
} from './constants';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  };
}

export function deleteCompanyFailure(payload) {
  return {
    payload,
    type: DELETE_COMPANY_FAILURE,
  };
}

export function deleteCompanySuccess(payload) {
  return {
    payload,
    type: DELETE_COMPANY_SUCCESS,
  };
}

export function deleteCompany(payload) {
  return {
    payload,
    type: DELETE_COMPANY,
  };
}

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

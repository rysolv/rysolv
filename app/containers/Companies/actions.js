import {
  CLEAR_ALERTS,
  DELETE_COMPANY_FAILURE,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY,
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
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

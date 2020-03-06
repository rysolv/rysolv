import {
  CLEAR_ALERTS,
  CLEAR_FORM,
  DELETE_COMPANY_FAILURE,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY,
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  VERIFY_INFO,
} from './constants';

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

export function verifyInfo() {
  return { type: VERIFY_INFO };
}

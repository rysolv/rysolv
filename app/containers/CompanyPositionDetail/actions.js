import {
  CHANGE_INPUT,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY,
  FETCH_POSITION_DETAIL_FAILURE,
  FETCH_POSITION_DETAIL_SUCCESS,
  FETCH_POSITION_DETAIL,
  NOTIFY_COMPANY_FAILURE,
  NOTIFY_COMPANY_SUCCESS,
  NOTIFY_COMPANY,
  OPEN_MODAL_STATE,
  RESET_FORM_STATE,
} from './constants';

export function changeInput(payload) {
  return {
    payload,
    type: CHANGE_INPUT,
  };
}

export function clearAlerts() {
  return { type: CLEAR_ALERTS };
}

export function closeModalState() {
  return { type: CLOSE_MODAL_STATE };
}

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

export function notifyCompanyFailure(payload) {
  return {
    payload,
    type: NOTIFY_COMPANY_FAILURE,
  };
}

export function notifyCompanySuccess() {
  return { type: NOTIFY_COMPANY_SUCCESS };
}

export function notifyCompany(payload) {
  return {
    payload,
    type: NOTIFY_COMPANY,
  };
}

export function openModalState(payload) {
  return {
    payload,
    type: OPEN_MODAL_STATE,
  };
}

export function resetFormState() {
  return { type: RESET_FORM_STATE };
}

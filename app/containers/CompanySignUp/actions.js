import {
  CHANGE_INPUT,
  CHANGE_VIEW,
  CLEAR_ALERTS,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  INPUT_ERROR,
  RESET_STATE,
  SUBMIT_COMPANY_RESPONSE_FAILURE,
  SUBMIT_COMPANY_RESPONSE_SUCCESS,
  SUBMIT_COMPANY_RESPONSE,
  SUBMIT_CONTRACT_ACCEPTED_FAILURE,
  SUBMIT_CONTRACT_ACCEPTED_SUCCESS,
  SUBMIT_CONTRACT_ACCEPTED,
} from './constants';

export function changeInput(payload) {
  return {
    payload,
    type: CHANGE_INPUT,
  };
}

export function changeView(payload) {
  return {
    payload,
    type: CHANGE_VIEW,
  };
}

export function clearAlerts() {
  return { type: CLEAR_ALERTS };
}

export function fetchQuestionsFailure(payload) {
  return {
    payload,
    type: FETCH_QUESTIONS_FAILURE,
  };
}

export function fetchQuestionsSuccess(payload) {
  return {
    payload,
    type: FETCH_QUESTIONS_SUCCESS,
  };
}

export function fetchQuestions(payload) {
  return {
    payload,
    type: FETCH_QUESTIONS,
  };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

export function resetState() {
  return { type: RESET_STATE };
}

export function submitCompanyResponseFailure(payload) {
  return {
    payload,
    type: SUBMIT_COMPANY_RESPONSE_FAILURE,
  };
}

export function submitCompanyResponseSuccess() {
  return { type: SUBMIT_COMPANY_RESPONSE_SUCCESS };
}

export function submitCompanyResponse(payload) {
  return {
    payload,
    type: SUBMIT_COMPANY_RESPONSE,
  };
}

export function submitContractAcceptedFailure(payload) {
  return {
    payload,
    type: SUBMIT_CONTRACT_ACCEPTED_FAILURE,
  };
}

export function submitContractAcceptedSuccess() {
  return { type: SUBMIT_CONTRACT_ACCEPTED_SUCCESS };
}

export function submitContractAccepted(payload) {
  return {
    payload,
    type: SUBMIT_CONTRACT_ACCEPTED,
  };
}

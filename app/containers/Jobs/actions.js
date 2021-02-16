import {
  CHANGE_INPUT,
  CHANGE_VIEW,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  SUBMIT_USER_RESPONSE_FAILURE,
  SUBMIT_USER_RESPONSE_SUCCESS,
  SUBMIT_USER_RESPONSE,
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

export function submitUserResponseFailure(payload) {
  return {
    payload,
    type: SUBMIT_USER_RESPONSE_FAILURE,
  };
}

export function submitUserResponseSuccess() {
  return { type: SUBMIT_USER_RESPONSE_SUCCESS };
}

export function submitUserResponse(payload) {
  return {
    payload,
    type: SUBMIT_USER_RESPONSE,
  };
}

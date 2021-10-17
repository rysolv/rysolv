import {
  CHANGE_FILTER,
  CHANGE_INPUT,
  CHANGE_REMOTE_STATUS,
  CHANGE_SKILL_LEVEL,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  CREATE_POSITION_FAILURE,
  CREATE_POSITION_SUCCESS,
  CREATE_POSITION,
  DELETE_SKILL,
  FETCH_COMPANY_MATCHES_FAILURE,
  FETCH_COMPANY_MATCHES_SUCCESS,
  FETCH_COMPANY_MATCHES,
  FETCH_POSITION_QUESTIONS_FAILURE,
  FETCH_POSITION_QUESTIONS_SUCCESS,
  FETCH_POSITION_QUESTIONS,
  INPUT_ERROR,
  NOTIFY_CANDIDATE_FAILURE,
  NOTIFY_CANDIDATE_SUCCESS,
  NOTIFY_CANDIDATE,
  OPEN_MODAL_STATE,
  RESET_FORM_STATE,
  SAVE_CANDIDATE,
  SELECT_POSITION,
} from './constants';

export function changeFilter(payload) {
  return {
    payload,
    type: CHANGE_FILTER,
  };
}

export function changeInput(payload) {
  return {
    payload,
    type: CHANGE_INPUT,
  };
}

export function changeRemoteStatus() {
  return { type: CHANGE_REMOTE_STATUS };
}

export function changeSkillLevel(payload) {
  return {
    payload,
    type: CHANGE_SKILL_LEVEL,
  };
}

export function clearAlerts() {
  return { type: CLEAR_ALERTS };
}

export function closeModalState() {
  return { type: CLOSE_MODAL_STATE };
}

export function createPositionFailure(payload) {
  return {
    payload,
    type: CREATE_POSITION_FAILURE,
  };
}

export function createPositionSuccess(payload) {
  return {
    payload,
    type: CREATE_POSITION_SUCCESS,
  };
}

export function createPosition(payload) {
  return {
    payload,
    type: CREATE_POSITION,
  };
}

export function deleteSkill(payload) {
  return {
    payload,
    type: DELETE_SKILL,
  };
}

export function fetchCompanyMatchesFailure(payload) {
  return {
    payload,
    type: FETCH_COMPANY_MATCHES_FAILURE,
  };
}

export function fetchCompanyMatchesSuccess(payload) {
  return {
    payload,
    type: FETCH_COMPANY_MATCHES_SUCCESS,
  };
}

export function fetchCompanyMatches() {
  return { type: FETCH_COMPANY_MATCHES };
}

export function fetchPositionQuestionsFailure(payload) {
  return {
    payload,
    type: FETCH_POSITION_QUESTIONS_FAILURE,
  };
}

export function fetchPositionQuestionsSuccess(payload) {
  return {
    payload,
    type: FETCH_POSITION_QUESTIONS_SUCCESS,
  };
}

export function fetchPositionQuestions(payload) {
  return {
    payload,
    type: FETCH_POSITION_QUESTIONS,
  };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
  };
}

export function notifyCandidate(payload) {
  return {
    payload,
    type: NOTIFY_CANDIDATE,
  };
}

export function notifyCandidateFailure(payload) {
  return {
    payload,
    type: NOTIFY_CANDIDATE_FAILURE,
  };
}

export function notifyCandidateSuccess(payload) {
  return {
    payload,
    type: NOTIFY_CANDIDATE_SUCCESS,
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

export function saveCandidate(payload) {
  return {
    payload,
    type: SAVE_CANDIDATE,
  };
}

export function selectPosition(payload) {
  return {
    payload,
    type: SELECT_POSITION,
  };
}

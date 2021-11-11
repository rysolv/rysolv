import {
  CHANGE_FILTER,
  CHANGE_INPUT,
  CHANGE_SKILL_LEVEL,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  CREATE_POSITION_FAILURE,
  CREATE_POSITION_SUCCESS,
  CREATE_POSITION,
  DELETE_POSITION_FAILURE,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION,
  DELETE_SKILL,
  EDIT_POSITION_FAILURE,
  EDIT_POSITION_SUCCESS,
  EDIT_POSITION,
  FETCH_COMPANY_POSITIONS_FAILURE,
  FETCH_COMPANY_POSITIONS_SUCCESS,
  FETCH_COMPANY_POSITIONS,
  FETCH_POSITION_CANDIDATES_FAILURE,
  FETCH_POSITION_CANDIDATES_SUCCESS,
  FETCH_POSITION_CANDIDATES,
  FETCH_POSITION_FAILURE,
  FETCH_POSITION_QUESTIONS_FAILURE,
  FETCH_POSITION_QUESTIONS_SUCCESS,
  FETCH_POSITION_QUESTIONS,
  FETCH_POSITION_SUCCESS,
  FETCH_POSITION,
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

export function deletePositionFailure(payload) {
  return {
    payload,
    type: DELETE_POSITION_FAILURE,
  };
}

export function deletePositionSuccess() {
  return { type: DELETE_POSITION_SUCCESS };
}

export function deletePosition(payload) {
  return {
    payload,
    type: DELETE_POSITION,
  };
}

export function deleteSkill(payload) {
  return {
    payload,
    type: DELETE_SKILL,
  };
}

export function editPositionFailure(payload) {
  return {
    payload,
    type: EDIT_POSITION_FAILURE,
  };
}

export function editPositionSuccess() {
  return { type: EDIT_POSITION_SUCCESS };
}

export function editPosition(payload) {
  return {
    payload,
    type: EDIT_POSITION,
  };
}

export function fetchCompanyPositionsFailure(payload) {
  return {
    payload,
    type: FETCH_COMPANY_POSITIONS_FAILURE,
  };
}

export function fetchCompanyPositionsSuccess(payload) {
  return {
    payload,
    type: FETCH_COMPANY_POSITIONS_SUCCESS,
  };
}

export function fetchCompanyPositions(payload) {
  return {
    payload,
    type: FETCH_COMPANY_POSITIONS,
  };
}

export function fetchPositionCandidatesFailure(payload) {
  return {
    payload,
    type: FETCH_POSITION_CANDIDATES_FAILURE,
  };
}

export function fetchPositionCandidatesSuccess(payload) {
  return {
    payload,
    type: FETCH_POSITION_CANDIDATES_SUCCESS,
  };
}

export function fetchPositionCandidates(payload) {
  return {
    payload,
    type: FETCH_POSITION_CANDIDATES,
  };
}

export function fetchPositionFailure(payload) {
  return {
    payload,
    type: FETCH_POSITION_FAILURE,
  };
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

export function fetchPositionSuccess(payload) {
  return {
    payload,
    type: FETCH_POSITION_SUCCESS,
  };
}

export function fetchPosition(payload) {
  return {
    payload,
    type: FETCH_POSITION,
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

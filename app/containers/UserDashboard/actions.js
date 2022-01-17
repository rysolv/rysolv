import {
  CHANGE_INPUT,
  CHANGE_SKILL_LEVEL,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  DELETE_SKILL,
  EDIT_USER_RESPONSE_FAILURE,
  EDIT_USER_RESPONSE_SUCCESS,
  EDIT_USER_RESPONSE,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  FETCH_USER_DASHBOARD_FAILURE,
  FETCH_USER_DASHBOARD_SUCCESS,
  FETCH_USER_DASHBOARD,
  FETCH_USER_RESPONSE_FAILURE,
  FETCH_USER_RESPONSE_SUCCESS,
  FETCH_USER_RESPONSE,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  RESET_FORM_STATE,
  SET_HIRING_STATUS_FAILURE,
  SET_HIRING_STATUS_SUCCESS,
  SET_HIRING_STATUS,
  UPDATE_USER_LINKS_FAILURE,
  UPDATE_USER_LINKS_SUCCESS,
  UPDATE_USER_LINKS,
  UPDATE_USER_SKILLS_FAILURE,
  UPDATE_USER_SKILLS_SUCCESS,
  UPDATE_USER_SKILLS,
} from './constants';

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

export function deleteSkill(payload) {
  return {
    payload,
    type: DELETE_SKILL,
  };
}

export function editUserResponseFailure(payload) {
  return {
    payload,
    type: EDIT_USER_RESPONSE_FAILURE,
  };
}

export function editUserResponseSuccess(payload) {
  return {
    payload,
    type: EDIT_USER_RESPONSE_SUCCESS,
  };
}

export function editUserResponse(payload) {
  return {
    payload,
    type: EDIT_USER_RESPONSE,
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

export function fetchUserDashboardFailure(payload) {
  return {
    payload,
    type: FETCH_USER_DASHBOARD_FAILURE,
  };
}

export function fetchUserDashboardSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_DASHBOARD_SUCCESS,
  };
}

export function fetchUserDashboard() {
  return { type: FETCH_USER_DASHBOARD };
}

export function fetchUserResponseFailure(payload) {
  return {
    payload,
    type: FETCH_USER_RESPONSE_FAILURE,
  };
}

export function fetchUserResponseSuccess(payload) {
  return {
    payload,
    type: FETCH_USER_RESPONSE_SUCCESS,
  };
}

export function fetchUserResponse() {
  return { type: FETCH_USER_RESPONSE };
}

export function inputError(payload) {
  return {
    payload,
    type: INPUT_ERROR,
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

export function setHiringStatusFailure(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS_FAILURE,
  };
}

export function setHiringStatusSuccess(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS_SUCCESS,
  };
}

export function setHiringStatus(payload) {
  return {
    payload,
    type: SET_HIRING_STATUS,
  };
}

export function updateUserLinksFailure(payload) {
  return {
    payload,
    type: UPDATE_USER_LINKS_FAILURE,
  };
}

export function updateUserLinksSuccess() {
  return { type: UPDATE_USER_LINKS_SUCCESS };
}

export function updateUserLinks(payload) {
  return {
    payload,
    type: UPDATE_USER_LINKS,
  };
}

export function updateUserSkillsFailure(payload) {
  return {
    payload,
    type: UPDATE_USER_SKILLS_FAILURE,
  };
}

export function updateUserSkillsSuccess() {
  return { type: UPDATE_USER_SKILLS_SUCCESS };
}

export function updateUserSkills(payload) {
  return {
    payload,
    type: UPDATE_USER_SKILLS,
  };
}

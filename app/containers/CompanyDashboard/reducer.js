/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';

import { snakeToCamel } from 'utils/globalHelpers';

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
  EDIT_COMPANY_FAILURE,
  EDIT_COMPANY_SUCCESS,
  EDIT_COMPANY,
  EDIT_POSITION_FAILURE,
  EDIT_POSITION_SUCCESS,
  EDIT_POSITION,
  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_POSITIONS_FAILURE,
  FETCH_COMPANY_POSITIONS_SUCCESS,
  FETCH_COMPANY_POSITIONS,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY,
  FETCH_POSITION_CANDIDATES_FAILURE,
  FETCH_POSITION_CANDIDATES_SUCCESS,
  FETCH_POSITION_CANDIDATES,
  FETCH_POSITION_FAILURE,
  FETCH_POSITION_SUCCESS,
  FETCH_POSITION,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  INPUT_ERROR,
  MATCH_CANDIDATES_FAILURE,
  MATCH_CANDIDATES_SUCCESS,
  MATCH_CANDIDATES,
  NOTIFY_CANDIDATE_FAILURE,
  NOTIFY_CANDIDATE_SUCCESS,
  NOTIFY_CANDIDATE,
  OPEN_MODAL_STATE,
  RESET_FORM_STATE,
  SAVE_CANDIDATE_FAILURE,
  SAVE_CANDIDATE_SUCCESS,
  SAVE_CANDIDATE,
  SELECT_POSITION,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  candidates: [],
  company: {},
  error: false,
  filter: {
    location: '',
    salary: 0,
    step: '',
    type: '',
  },
  form: {
    company: {
      description: '',
      location: {},
      logo: '',
      name: '',
      size: '',
      website: '',
    },
    companyPosition: {
      description: '',
      experience: '',
      isActive: 'Yes',
      location: {},
      role: [],
      salary: '',
      skills: [],
      timezone: '',
      title: '',
      type: '',
    },
    scheduleInterview: { body: '' },
  },
  formErrors: {
    company: {
      description: '',
      location: '',
      name: '',
      size: '',
      website: '',
    },
    companyPosition: {
      description: '',
      experience: '',
      location: '',
      role: '',
      salary: '',
      skills: '',
      timezone: '',
      title: '',
      type: '',
    },
    scheduleInterview: { body: '' },
  },
  isModalOpen: false,
  loading: {
    createPosition: false,
    deletePosition: false,
    editCompany: false,
    editPosition: false,
    fetchCompany: false,
    fetchCompanyPositions: true,
    fetchPosition: false,
    fetchPositionCandidates: false,
    fetchQuestions: true,
    matchCandidates: false,
    notifyCandidate: false,
    saveCandidate: false,
  },
  messageAlerts: { error: false, success: false },
  positions: [],
  questions: {
    company: [],
    companyPosition: [],
  },
  selectedPosition: '',
  shouldRefetchCandidates: true,
  shouldRefetchCompany: true,
  tableData: {},
};

const companyDashboardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_FILTER: {
      const { field, value } = payload;
      draft.filter[field] = value;
      draft.shouldRefetchCandidates = true;
      break;
    }
    case CHANGE_INPUT: {
      const { field, form, value } = payload;
      if (field === 'skills') {
        const skillsArray = draft.form[form][field].filter(
          ({ skill }) => skill === value,
        );
        if (isEmpty(skillsArray)) {
          draft.form[form][field].push({
            beginner: false,
            expert: false,
            intermediate: false,
            skill: value,
          });
        }
      } else {
        draft.form[form][field] = value || '';
      }
      break;
    }
    case CHANGE_SKILL_LEVEL: {
      const { level, skill: skillToChange } = payload;
      draft.form.companyPosition.skills.map(
        ({ skill, ...restProps }, index) => {
          if (skill === skillToChange) {
            draft.form.companyPosition.skills[index] = {
              beginner: false,
              expert: false,
              intermediate: false,
              skill,
              [level]: !restProps[level],
            };
          }
        },
      );
      break;
    }
    case CLEAR_ALERTS: {
      const { alertType } = payload;
      if (alertType) draft[alertType] = initialState[alertType];
      else draft.alerts = initialState.alerts;
      break;
    }
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = initialState.isModalOpen;
      draft.tableData = initialState.tableData;
      break;
    }
    case CREATE_POSITION_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.createPosition = false;
      break;
    }
    case CREATE_POSITION_SUCCESS: {
      const { positionId } = payload;
      draft.loading.createPosition = false;
      draft.selectedPosition = positionId;
      draft.shouldRefetchCandidates = true;
      break;
    }
    case CREATE_POSITION: {
      draft.alerts = initialState.alerts;
      draft.loading.createPosition = true;
      break;
    }
    case DELETE_POSITION_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deletePosition = false;
      break;
    }
    case DELETE_POSITION_SUCCESS: {
      draft.loading.deletePosition = false;
      break;
    }
    case DELETE_POSITION: {
      draft.alerts = initialState.alerts;
      draft.loading.deletePosition = true;
      break;
    }
    case DELETE_SKILL: {
      const { skill: skillToDelete } = payload;
      remove(
        draft.form.companyPosition.skills,
        ({ skill }) => skill === skillToDelete,
      );
      break;
    }
    case EDIT_COMPANY_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.editCompany = false;
      break;
    }
    case EDIT_COMPANY_SUCCESS: {
      draft.company = draft.form.company;
      draft.loading.editCompany = false;
      break;
    }
    case EDIT_COMPANY: {
      draft.alerts = initialState.alerts;
      draft.loading.editCompany = true;
      break;
    }
    case EDIT_POSITION_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.editPosition = false;
      break;
    }
    case EDIT_POSITION_SUCCESS: {
      draft.loading.editPosition = false;
      draft.shouldRefetchCandidates = true;
      break;
    }
    case EDIT_POSITION: {
      draft.alerts = initialState.alerts;
      draft.loading.editPosition = true;
      break;
    }
    case FETCH_COMPANY_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchCompany = false;
      break;
    }
    case FETCH_COMPANY_POSITIONS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchCompanyPositions = false;
      break;
    }
    case FETCH_COMPANY_POSITIONS_SUCCESS: {
      const { positions } = payload;
      draft.loading.fetchCompanyPositions = false;
      draft.positions = positions;
      if (!draft.selectedPosition) {
        if (!isEmpty(positions)) draft.selectedPosition = positions[0].id;
        else draft.selectedPosition = '';
      }
      break;
    }
    case FETCH_COMPANY_POSITIONS: {
      draft.error = initialState.error;
      draft.loading.fetchCompanyPositions = true;
      break;
    }
    case FETCH_COMPANY_SUCCESS: {
      const { company } = payload;
      draft.company = company;
      draft.form.company = company;
      draft.loading.fetchCompany = false;
      draft.shouldRefetchCompany = false;
      break;
    }
    case FETCH_COMPANY: {
      draft.error = initialState.error;
      draft.loading.fetchCompany = true;
      break;
    }
    case FETCH_POSITION_CANDIDATES_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchPositionCandidates = false;
      break;
    }
    case FETCH_POSITION_CANDIDATES_SUCCESS: {
      const { candidates } = payload;
      draft.candidates = candidates;
      draft.loading.fetchPositionCandidates = false;
      draft.shouldRefetchCandidates = false;
      break;
    }
    case FETCH_POSITION_CANDIDATES: {
      draft.error = initialState.error;
      draft.loading.fetchPositionCandidates = true;
      break;
    }
    case FETCH_POSITION_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchPosition = false;
      break;
    }
    case FETCH_POSITION_SUCCESS: {
      const { position } = payload;
      draft.form.companyPosition = position;
      draft.loading.fetchPosition = false;
      break;
    }
    case FETCH_POSITION: {
      draft.error = initialState.error;
      draft.loading.fetchPosition = true;
      break;
    }
    case FETCH_QUESTIONS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchQuestions = false;
      break;
    }
    case FETCH_QUESTIONS_SUCCESS: {
      const { category, questions } = payload;
      draft.loading.fetchQuestions = false;
      draft.questions[snakeToCamel(category)] = questions;
      break;
    }
    case FETCH_QUESTIONS: {
      draft.error = initialState.error;
      draft.loading.fetchQuestions = true;
      break;
    }
    case INPUT_ERROR: {
      const { errors, form } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.formErrors[form][field] = errors[field] || '';
      });
      break;
    }
    case MATCH_CANDIDATES_FAILURE: {
      draft.loading.matchCandidates = false;
      break;
    }
    case MATCH_CANDIDATES_SUCCESS: {
      draft.loading.matchCandidates = false;
      draft.shouldRefetchCandidates = true;
      break;
    }
    case MATCH_CANDIDATES: {
      draft.loading.matchCandidates = true;
      break;
    }
    case NOTIFY_CANDIDATE_FAILURE: {
      const { error } = payload;
      draft.loading.notifyCandidate = false;
      draft.messageAlerts.error = error;
      break;
    }
    case NOTIFY_CANDIDATE_SUCCESS: {
      const { candidateId, threadId } = payload;
      const candidateIndex = draft.candidates.findIndex(
        ({ id }) => candidateId === id,
      );
      draft.candidates[candidateIndex].threadId = threadId;
      draft.loading.notifyCandidate = false;
      break;
    }
    case NOTIFY_CANDIDATE: {
      draft.loading.notifyCandidate = true;
      draft.messageAlerts = initialState.messageAlerts;
      break;
    }
    case OPEN_MODAL_STATE: {
      const { tableData } = payload;
      draft.isModalOpen = true;
      draft.tableData = tableData || {};
      break;
    }
    case RESET_FORM_STATE: {
      const { category } = payload;
      if (category === 'company') draft.shouldRefetchCompany = true;
      draft.form[category] = initialState.form[category];
      draft.formErrors[category] = initialState.formErrors[category];
      break;
    }
    case SAVE_CANDIDATE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.saveCandidate = false;
      break;
    }
    case SAVE_CANDIDATE_SUCCESS: {
      const { candidateId } = payload;
      draft.candidates.map((el, i) => {
        if (el.id === candidateId) draft.candidates[i].isSaved = !el.isSaved;
      });
      draft.loading.saveCandidate = false;
      break;
    }
    case SAVE_CANDIDATE: {
      draft.loading.saveCandidate = true;
      break;
    }
    case SELECT_POSITION: {
      const { id } = payload;
      draft.selectedPosition = id;
      draft.shouldRefetchCandidates = true;
      break;
    }
  }
}, initialState);

export default companyDashboardReducer;

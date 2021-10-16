/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';

import {
  CHANGE_FILTER,
  CHANGE_INPUT,
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

export const initialState = {
  alerts: { error: false, success: false },
  companyMatches: [],
  error: false,
  filter: {
    location: '',
    salary: 0,
    step: '',
    type: '',
  },
  form: {
    createPosition: {
      description: '',
      experience: '',
      hiringTimeframe: '',
      location: 't',
      role: '',
      salary: '',
      skills: [],
      type: '',
    },
    scheduleInterview: { body: '' },
  },
  formErrors: {
    createPosition: {
      description: '',
      experience: '',
      hiringTimeframe: '',
      location: '',
      role: '',
      salary: '',
      skills: '',
      type: '',
    },
    scheduleInterview: { body: '' },
  },
  isModalOpen: false,
  loading: false,
  questions: [],
  selectedPosition: '',
  tableData: {},
};

const companyDashboardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_FILTER: {
      const { field, value } = payload;
      draft.filter[field] = value;
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
        draft.form[form][field] = value;
      }
      break;
    }
    case CHANGE_SKILL_LEVEL: {
      const { level, skill: skillToChange } = payload;
      draft.form.createPosition.skills.map(({ skill, ...restProps }, index) => {
        if (skill === skillToChange) {
          draft.form.createPosition.skills[index] = {
            beginner: false,
            expert: false,
            intermediate: false,
            skill,
            [level]: !restProps[level],
          };
        }
      });
      break;
    }
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
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
      draft.loading = false;
      break;
    }
    case CREATE_POSITION_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading = false;
      break;
    }
    case CREATE_POSITION: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
    case DELETE_SKILL: {
      const { skill: skillToDelete } = payload;
      remove(
        draft.form.createPosition.skills,
        ({ skill }) => skill === skillToDelete,
      );
      break;
    }
    case FETCH_COMPANY_MATCHES_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_COMPANY_MATCHES_SUCCESS: {
      const { companyMatchesArray } = payload;
      draft.companyMatches = companyMatchesArray;
      draft.loading = false;
      draft.selectedPosition = companyMatchesArray[0].position.id;
      break;
    }
    case FETCH_COMPANY_MATCHES: {
      draft.error = initialState.error;
      draft.loading = true;
      break;
    }
    case FETCH_POSITION_QUESTIONS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      break;
    }
    case FETCH_POSITION_QUESTIONS_SUCCESS: {
      const { questions } = payload;
      draft.questions = questions;
      break;
    }
    case FETCH_POSITION_QUESTIONS: {
      draft.error = initialState.error;
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
    case NOTIFY_CANDIDATE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case NOTIFY_CANDIDATE_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading = false;
      break;
    }
    case NOTIFY_CANDIDATE: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
    case OPEN_MODAL_STATE: {
      const { tableData } = payload;
      draft.isModalOpen = true;
      draft.tableData = tableData || {};
      break;
    }
    case RESET_FORM_STATE: {
      draft.form = initialState.form;
      draft.formErrors = initialState.formErrors;
      draft.isModalOpen = initialState.isModalOpen;
      break;
    }
    case SAVE_CANDIDATE: {
      const { index } = payload;
      const { selectedPosition } = draft;
      draft.companyMatches.map(({ candidates, position }) => {
        if (position.id === selectedPosition) {
          candidates[index].isSaved = !candidates[index].isSaved;
        }
      });
      break;
    }
    case SELECT_POSITION: {
      const { id } = payload;
      draft.selectedPosition = id;
      break;
    }
  }
}, initialState);

export default companyDashboardReducer;

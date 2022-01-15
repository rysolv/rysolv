/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';

import {
  CHANGE_INPUT,
  CHANGE_SKILL_LEVEL,
  CHANGE_VIEW,
  DELETE_SKILL,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS,
  INPUT_ERROR,
  RESET_STATE,
  SUBMIT_USER_RESPONSE_FAILURE,
  SUBMIT_USER_RESPONSE_SUCCESS,
  SUBMIT_USER_RESPONSE,
} from './constants';

export const initialState = {
  error: null,
  loading: true,
  form: {
    desiredRole: [],
    experience: [],
    isActive: '',
    isRemote: 'No',
    preferredLocation: {},
    resume: [],
    skills: [],
    targetSalary: [],
    timezone: '',
    type: [],
    usCitizen: '',
  },
  formErrors: {
    preferredLocation: '',
  },
  questions: [],
  view: 0,
};

const jobsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { field, value } = payload;
      if (field === 'skills') {
        const skillsArray = draft.form[field].filter(
          ({ skill }) => skill === value,
        );
        if (isEmpty(skillsArray)) {
          draft.form[field].push({
            beginner: false,
            expert: false,
            intermediate: false,
            skill: value,
          });
        }
      } else {
        draft.form[field] = value;
      }
      break;
    }
    case CHANGE_SKILL_LEVEL: {
      const { level, skill: skillToChange } = payload;
      draft.form.skills.map(({ skill, ...restProps }, index) => {
        if (skill === skillToChange) {
          draft.form.skills[index] = {
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
    case CHANGE_VIEW: {
      const { view } = payload;
      draft.loading = false;
      draft.view = view;
      break;
    }
    case DELETE_SKILL: {
      const { skill: skillToDelete } = payload;
      remove(draft.form.skills, ({ skill }) => skill === skillToDelete);
      break;
    }
    case FETCH_QUESTIONS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_QUESTIONS_SUCCESS: {
      const { questions } = payload;
      draft.loading = false;
      draft.questions = questions;
      break;
    }
    case FETCH_QUESTIONS: {
      draft.error = null;
      draft.loading = true;
      break;
    }
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.formErrors[field] = errors[field] || '';
      });
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
    case SUBMIT_USER_RESPONSE_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case SUBMIT_USER_RESPONSE_SUCCESS: {
      draft.loading = false;
      break;
    }
    case SUBMIT_USER_RESPONSE: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default jobsReducer;

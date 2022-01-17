/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';

import { converDataUrlToBlob } from 'utils/globalHelpers';

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

export const initialState = {
  alerts: { error: false, success: false },
  error: null,
  form: {
    application: {
      desiredRole: [],
      experience: [],
      isActive: 'No',
      preferredLocation: {},
      resume: [],
      skills: [],
      targetSalary: [],
      type: [],
      usCitizen: '',
    },
    profile: {
      githubLink: '',
      personalLink: '',
      stackoverflowLink: '',
    },
  },
  formErrors: {
    application: {
      desiredRole: '',
      experience: '',
      isActive: '',
      preferredLocation: '',
      resume: '',
      skills: '',
      targetSalary: '',
      type: '',
      usCitizen: '',
    },
    profile: {
      githubLink: '',
      personalLink: '',
      stackoverflowLink: '',
    },
  },
  isModalOpen: false,
  loading: {
    editUserResponse: false,
    fetchQuestions: true,
    fetchUserDashboard: true,
    fetchUserResponse: true,
    setHiringStatus: false,
    updateUserLinks: false,
    updateUserSkills: false,
  },
  modal: '',
  questions: [],
  skills: [],
  user: {},
};

const userDashboardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { field, form, value } = payload;
      if (field === 'skills') {
        const skillsArray = draft.form.application[field].filter(
          ({ skill }) => skill === value,
        );
        if (isEmpty(skillsArray)) {
          draft.form.application[field].push({
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
      draft.form.application.skills.map(({ skill, ...restProps }, index) => {
        if (skill === skillToChange) {
          draft.form.application.skills[index] = {
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
      draft.modal = initialState.modal;
      break;
    }
    case DELETE_SKILL: {
      const { skill: skillToDelete } = payload;
      remove(
        draft.form.application.skills,
        ({ skill }) => skill === skillToDelete,
      );
      break;
    }
    case EDIT_USER_RESPONSE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.editUserResponse = false;
      break;
    }
    case EDIT_USER_RESPONSE_SUCCESS: {
      draft.loading.editUserResponse = false;
      break;
    }
    case EDIT_USER_RESPONSE: {
      draft.alerts.error = false;
      draft.loading.editUserResponse = true;
      break;
    }
    case FETCH_QUESTIONS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchQuestions = false;
      break;
    }
    case FETCH_QUESTIONS_SUCCESS: {
      const { questions } = payload;
      draft.loading.fetchQuestions = false;
      draft.questions = questions;
      break;
    }
    case FETCH_QUESTIONS: {
      draft.error = null;
      draft.loading.fetchQuestions = true;
      break;
    }
    case FETCH_USER_DASHBOARD_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchUserDashboard = false;
      break;
    }
    case FETCH_USER_DASHBOARD_SUCCESS: {
      const { user } = payload;
      draft.form.application.skills = user.skills;
      draft.form.profile.githubLink = user.githubLink;
      draft.form.profile.personalLink = user.personalLink;
      draft.form.profile.stackoverflowLink = user.stackoverflowLink;
      draft.loading.fetchUserDashboard = false;
      draft.user = { ...draft.user, ...user };
      break;
    }
    case FETCH_USER_DASHBOARD: {
      draft.error = null;
      draft.loading.fetchUserDashboard = true;
      break;
    }
    case FETCH_USER_RESPONSE_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchUserResponse = false;
      break;
    }
    case FETCH_USER_RESPONSE_SUCCESS: {
      const { user } = payload;
      const { resume, ...restProps } = user;
      if (resume) {
        const { blob, mime } = converDataUrlToBlob(resume);
        draft.form.application.resume = [
          new File([blob], 'Resume', { type: mime }),
        ];
      }
      draft.form.application = { ...draft.form.application, ...restProps };
      draft.loading.fetchUserResponse = false;
      draft.user = { ...draft.user, ...user };
      break;
    }
    case FETCH_USER_RESPONSE: {
      draft.error = null;
      draft.loading.fetchUserResponse = true;
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
    case OPEN_MODAL_STATE: {
      const { modalState } = payload;
      draft.isModalOpen = true;
      draft.modal = modalState;
      break;
    }
    case RESET_FORM_STATE: {
      draft.form.application = initialState.form.application;
      draft.form.profile.githubLink = draft.user.githubLink;
      draft.form.profile.personalLink = draft.user.personalLink;
      draft.form.profile.stackoverflowLink = draft.user.stackoverflowLink;
      draft.formErrors = initialState.formErrors;
      break;
    }
    case SET_HIRING_STATUS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.setHiringStatus = false;
      break;
    }
    case SET_HIRING_STATUS_SUCCESS: {
      const { hiringStatus } = payload;
      draft.loading.setHiringStatus = false;
      draft.user.hiringStatus = hiringStatus;
      break;
    }
    case SET_HIRING_STATUS: {
      draft.error = null;
      draft.loading.setHiringStatus = true;
      break;
    }
    case UPDATE_USER_LINKS_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.updateUserLinks = false;
      break;
    }
    case UPDATE_USER_LINKS_SUCCESS: {
      draft.loading.updateUserLinks = false;
      draft.user.githubLink = draft.form.profile.githubLink;
      draft.user.personalLink = draft.form.profile.personalLink;
      draft.user.stackoverflowLink = draft.form.profile.stackoverflowLink;
      break;
    }
    case UPDATE_USER_LINKS: {
      draft.alerts.error = false;
      draft.loading.updateUserLinks = true;
      break;
    }
    case UPDATE_USER_SKILLS_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.updateUserSkills = false;
      break;
    }
    case UPDATE_USER_SKILLS_SUCCESS: {
      draft.loading.updateUserSkills = false;
      draft.user.skills = draft.form.application.skills;
      break;
    }
    case UPDATE_USER_SKILLS: {
      draft.alerts.error = false;
      draft.loading.updateUserSkills = true;
      break;
    }
  }
}, initialState);

export default userDashboardReducer;

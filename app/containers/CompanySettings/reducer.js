/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_INPUT,
  CLOSE_MODAL_STATE,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
} from './constants';

export const initialState = {
  companyUser: {},
  error: null,
  form: {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  },
  formErrors: {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  },
  isModalOpen: false,
  loading: true,
  modal: '',
};

const companySettingsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { field, value } = payload;
      draft.form[field] = value;
      break;
    }
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = initialState.isModalOpen;
      draft.modal = initialState.modal;
      break;
    }
    case DELETE_USER_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case DELETE_USER_SUCCESS: {
      draft.loading = false;
      break;
    }
    case DELETE_USER: {
      draft.error = null;
      draft.loading = true;
      break;
    }
    case EDIT_USER_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case EDIT_USER_SUCCESS: {
      draft.loading = false;
      break;
    }
    case EDIT_USER: {
      draft.error = null;
      draft.loading = true;
      break;
    }
    case FETCH_USER_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_USER_SUCCESS: {
      const { user } = payload;
      draft.companyUser = user;
      draft.form = user;
      draft.loading = false;
      break;
    }
    case FETCH_USER: {
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
    case OPEN_MODAL_STATE: {
      const { modalState } = payload;
      draft.isModalOpen = true;
      draft.modal = modalState;
      break;
    }
  }
}, initialState);

export default companySettingsReducer;

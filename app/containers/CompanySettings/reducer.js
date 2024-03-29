/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import { RESET_USER_STATE } from 'containers/Main/constants';

import {
  CHANGE_INPUT,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER,
  FETCH_CONTRACT_FAILURE,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT,
  FETCH_PLAID_TOKEN_FAILURE,
  FETCH_PLAID_TOKEN_SUCCESS,
  FETCH_PLAID_TOKEN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  RESET_MODAL_STATE,
  SET_MODAL_ALERTS,
  SUBMIT_CONTRACT_ACCEPTED_FAILURE,
  SUBMIT_CONTRACT_ACCEPTED_SUCCESS,
  SUBMIT_CONTRACT_ACCEPTED,
  UPDATE_PAYMENT_METHOD_FAILURE,
  UPDATE_PAYMENT_METHOD_SUCCESS,
  UPDATE_PAYMENT_METHOD,
} from './constants';

export const initialState = {
  companyUser: {},
  contract: {
    body: '',
    contractAccepted: false,
    subtitle: '',
    title: '',
  },
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
  loading: {
    editUser: false,
    fetchContract: false,
    fetchUser: true,
    modal: false,
    submitContractAccepted: false,
  },
  modal: '',
  modalAlerts: { error: false, success: false },
  plaidToken: null,
};

const companySettingsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { form, field, value } = payload;
      draft[form][field] = value;
      break;
    }
    case CLEAR_ALERTS: {
      draft.error = initialState.error;
      draft.formErrors = initialState.formErrors;
      draft.modalAlerts = initialState.modalAlerts;
      break;
    }
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = initialState.isModalOpen;
      draft.modal = initialState.modal;
      draft.plaidToken = null;
      break;
    }
    case EDIT_USER_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.editUser = false;
      break;
    }
    case EDIT_USER_SUCCESS: {
      draft.loading.editUser = false;
      break;
    }
    case EDIT_USER: {
      draft.error = null;
      draft.loading.editUser = true;
      break;
    }
    case FETCH_CONTRACT_FAILURE: {
      const { error } = payload;
      draft.loading.fetchContract = false;
      draft.modalAlerts.error = { message: error };
      break;
    }
    case FETCH_CONTRACT_SUCCESS: {
      const { contract } = payload;
      draft.contract = { contractAccepted: false, ...contract };
      draft.loading.fetchContract = false;
      break;
    }
    case FETCH_CONTRACT: {
      draft.error = null;
      draft.loading.fetchContract = true;
      break;
    }
    case FETCH_PLAID_TOKEN_FAILURE: {
      const { error } = payload;
      draft.error = error;
      break;
    }
    case FETCH_PLAID_TOKEN_SUCCESS: {
      const { token } = payload;
      draft.plaidToken = token;
      break;
    }
    case FETCH_PLAID_TOKEN: {
      draft.error = null;
      break;
    }
    case FETCH_USER_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading.fetchUser = false;
      break;
    }
    case FETCH_USER_SUCCESS: {
      const { user } = payload;
      draft.companyUser = user;
      draft.form = user;
      draft.loading.fetchUser = false;
      break;
    }
    case FETCH_USER: {
      draft.error = null;
      draft.loading.fetchUser = true;
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
    case RESET_MODAL_STATE: {
      draft.modalAlerts = initialState.modalAlerts;
      break;
    }
    case RESET_USER_STATE: {
      return initialState;
    }
    case SET_MODAL_ALERTS: {
      const { error } = payload;
      draft.modalAlerts.error = { message: error };
      break;
    }
    case SUBMIT_CONTRACT_ACCEPTED_FAILURE: {
      const { error } = payload;
      draft.loading.submitContractAccepted = false;
      draft.modalAlerts.error = { message: error };
      break;
    }
    case SUBMIT_CONTRACT_ACCEPTED_SUCCESS: {
      draft.loading.submitContractAccepted = false;
      break;
    }
    case SUBMIT_CONTRACT_ACCEPTED: {
      draft.error = null;
      draft.loading.submitContractAccepted = true;
      break;
    }
    case UPDATE_PAYMENT_METHOD_FAILURE: {
      const { error } = payload;
      draft.loading.modal = false;
      draft.modalAlerts.error = { message: error };
      break;
    }
    case UPDATE_PAYMENT_METHOD_SUCCESS: {
      draft.loading.modal = false;
      break;
    }
    case UPDATE_PAYMENT_METHOD: {
      draft.error = null;
      draft.loading.modal = true;
      break;
    }
  }
}, initialState);

export default companySettingsReducer;

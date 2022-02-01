/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_INPUT,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY,
  FETCH_POSITION_DETAIL_FAILURE,
  FETCH_POSITION_DETAIL_SUCCESS,
  FETCH_POSITION_DETAIL,
  NOTIFY_COMPANY_FAILURE,
  NOTIFY_COMPANY_SUCCESS,
  NOTIFY_COMPANY,
  OPEN_MODAL_STATE,
  RESET_FORM_STATE,
} from './constants';

export const initialState = {
  company: {},
  error: false,
  form: {
    body: '',
  },
  formErrors: {
    body: '',
  },
  isModalOpen: false,
  loading: {
    fetchCompany: true,
    fetchPositionDetail: true,
    notifyCompany: false,
  },
  messageAlerts: { error: false, success: false },
  modal: '',
  position: {},
};

const companyPositionDetailReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_INPUT: {
      const { field, value } = payload;
      draft.form[field] = value;
      break;
    }
    case CLEAR_ALERTS: {
      draft.messageAlerts = initialState.messageAlerts;
      break;
    }
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = initialState.isModalOpen;
      draft.modal = initialState.modal;
      break;
    }
    case FETCH_COMPANY_FAILURE: {
      draft.error = true;
      draft.loading.fetchCompany = false;
      break;
    }
    case FETCH_COMPANY_SUCCESS: {
      const { company } = payload;
      draft.company = company;
      draft.loading.fetchCompany = false;
      break;
    }
    case FETCH_COMPANY: {
      draft.error = initialState.error;
      draft.loading.fetchCompany = true;
      break;
    }
    case FETCH_POSITION_DETAIL_FAILURE: {
      draft.error = true;
      draft.loading.fetchPositionDetail = false;
      break;
    }
    case FETCH_POSITION_DETAIL_SUCCESS: {
      const { position } = payload;
      draft.loading.fetchPositionDetail = false;
      draft.position = position;
      break;
    }
    case FETCH_POSITION_DETAIL: {
      draft.error = initialState.error;
      draft.loading.fetchPositionDetail = true;
      break;
    }
    case NOTIFY_COMPANY_FAILURE: {
      const { error } = payload;
      draft.loading.notifyCompany = false;
      draft.messageAlerts.error = error;
      break;
    }
    case NOTIFY_COMPANY_SUCCESS: {
      draft.loading.notifyCompany = false;
      draft.position.hasApplied = true;
      break;
    }
    case NOTIFY_COMPANY: {
      draft.loading.notifyCompany = true;
      draft.messageAlerts = initialState.messageAlerts;
      break;
    }
    case OPEN_MODAL_STATE: {
      const { modalState } = payload;
      draft.isModalOpen = true;
      draft.modal = modalState;
      break;
    }
    case RESET_FORM_STATE: {
      draft.form = initialState.form;
      draft.formErrors = initialState.formErrors;
      break;
    }
  }
}, initialState);

export default companyPositionDetailReducer;

/* eslint-disable array-callback-return */
import produce from 'immer';
import {
  CLEAR_ALERTS,
  DELETE_COMPANY_FAILURE,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY,
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  companies: [],
  data: {
    companyUrl: { error: '', value: '' },
    description: { error: '', value: '' },
    githubUrl: { error: '', value: '' },
    icon: { error: '', value: '' },
    importUrl: { error: '', value: '' },
    name: { error: '', value: '' },
  },
  loading: {
    companies: false,
    deleteCompany: false,
  },
  error: {
    companies: false,
  },
  step: 1,
};

/* eslint-disable default-case, no-param-reassign */
const companiesReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case DELETE_COMPANY_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deleteCompany = false;
      break;
    }
    case DELETE_COMPANY_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteCompany = false;
      break;
    }
    case DELETE_COMPANY: {
      draft.loading.deleteCompany = true;
      break;
    }
    case FETCH_COMPANIES_FAILURE: {
      const { error } = payload;
      draft.error.companies = error;
      draft.loading.companies = false;
      break;
    }
    case FETCH_COMPANIES_SUCCESS: {
      const { companies } = payload;
      draft.companies = companies;
      draft.loading.companies = false;
      break;
    }
    case FETCH_COMPANIES: {
      draft.loading.companies = true;
      break;
    }
    case INCREMENT_STEP: {
      const { step } = payload;
      draft.step = step;
      break;
    }
    case INPUT_CHANGE: {
      const { field, value } = payload;
      draft.data[field].value = value;
      break;
    }
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.data[field].error = errors[field] || '';
      });
      break;
    }
  }
}, initialState);

export default companiesReducer;

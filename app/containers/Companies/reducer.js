import produce from 'immer';
import {
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES,
} from './constants';

export const initialState = {
  companies: [],
  loading: {
    companies: false,
  },
  error: {
    companies: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const companiesReducer = produce((draft, { payload, type }) => {
  switch (type) {
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
  }
}, initialState);

export default companiesReducer;

/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY,
  FETCH_POSITION_DETAIL_FAILURE,
  FETCH_POSITION_DETAIL_SUCCESS,
  FETCH_POSITION_DETAIL,
} from './constants';

export const initialState = {
  company: {},
  error: false,
  loading: {
    fetchCompany: true,
    fetchPositionDetail: true,
  },
  position: {},
};

const companyPositionDetailReducer = produce((draft, { payload, type }) => {
  switch (type) {
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
  }
}, initialState);

export default companyPositionDetailReducer;

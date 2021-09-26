/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_FILTER,
  CHANGE_INPUT,
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  FETCH_COMPANY_MATCHES_FAILURE,
  FETCH_COMPANY_MATCHES_SUCCESS,
  FETCH_COMPANY_MATCHES,
  NOTIFY_CANDIDATE_FAILURE,
  NOTIFY_CANDIDATE_SUCCESS,
  NOTIFY_CANDIDATE,
  OPEN_MODAL_STATE,
  RESET_MODAL_STATE,
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
  form: { body: '' },
  formErrors: { body: '' },
  isModalOpen: false,
  loading: false,
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
      const { field, value } = payload;
      draft.form[field] = value;
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
    case RESET_MODAL_STATE: {
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

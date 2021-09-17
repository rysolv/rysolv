/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_FILTER,
  CHANGE_INPUT,
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
  companyMatches: [],
  error: false,
  filter: {
    location: '',
    salary: 0,
    step: '',
    type: '',
  },
  form: { email: '' },
  formErrors: { email: '' },
  isModalOpen: false,
  loading: false,
  selectedPosition: '',
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
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = false;
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
      draft.selectedPosition = companyMatchesArray[0].position.title;
      break;
    }
    case FETCH_COMPANY_MATCHES: {
      draft.error = initialState.error;
      draft.loading = true;
      break;
    }
    case NOTIFY_CANDIDATE_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case NOTIFY_CANDIDATE_SUCCESS: {
      draft.loading = false;
      break;
    }
    case NOTIFY_CANDIDATE: {
      draft.error = initialState.error;
      draft.loading = true;
      break;
    }
    case OPEN_MODAL_STATE: {
      draft.isModalOpen = true;
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
        if (position.title === selectedPosition) {
          candidates[index].isSaved = !candidates[index].isSaved;
        }
      });
      break;
    }
    case SELECT_POSITION: {
      const { position } = payload;
      draft.selectedPosition = position;
      break;
    }
  }
}, initialState);

export default companyDashboardReducer;

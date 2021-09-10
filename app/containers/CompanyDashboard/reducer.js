/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_FILTER,
  CLOSE_MODAL_STATE,
  FETCH_COMPANY_MATCHES_FAILURE,
  FETCH_COMPANY_MATCHES_SUCCESS,
  FETCH_COMPANY_MATCHES,
  OPEN_MODAL_STATE,
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
    case OPEN_MODAL_STATE: {
      draft.isModalOpen = true;
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

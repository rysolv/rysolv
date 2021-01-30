/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_FILTER_OPTIONS_FAILURE,
  FETCH_FILTER_OPTIONS_SUCCESS,
  FETCH_FILTER_OPTIONS,
  RESET_STATE,
} from './constants';

export const initialState = {
  error: null,
  filterOptions: {
    bugTag: 0,
    closedIssues: 0,
    featureTag: 0,
    fundedIssues: 0,
    issueLanguages: [],
    maxBounty: 1,
    organizations: [],
    unfundedIssues: 0,
    userLanguages: [],
  },
  loading: false,
};

const overviewReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_FILTER_OPTIONS_FAILURE: {
      draft.loading = false;
      break;
    }
    case FETCH_FILTER_OPTIONS_SUCCESS: {
      const { filterOptions } = payload;
      draft.loading = false;
      draft.filterOptions = filterOptions;
      break;
    }
    case FETCH_FILTER_OPTIONS: {
      draft.loading = true;
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
  }
}, initialState);

export default overviewReducer;

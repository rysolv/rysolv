/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_ORGANIZATION_OPTIONS_FAILURE,
  FETCH_ORGANIZATION_OPTIONS_SUCCESS,
  FETCH_ORGANIZATION_OPTIONS,
  RESET_STATE,
} from './constants';

export const initialState = {
  error: null,
  loading: false,
  organizationOptions: [],
};

const overviewReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_ORGANIZATION_OPTIONS_FAILURE: {
      draft.loading = false;
      break;
    }
    case FETCH_ORGANIZATION_OPTIONS_SUCCESS: {
      const { organizations } = payload;
      draft.loading = false;
      draft.organizationOptions = organizations;
      break;
    }
    case FETCH_ORGANIZATION_OPTIONS: {
      draft.loading = true;
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
  }
}, initialState);

export default overviewReducer;

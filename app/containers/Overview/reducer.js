/* eslint-disable array-callback-return */
import produce from 'immer';

import {
  FETCH_ORGANIZATION_OPTIONS_FAILURE,
  FETCH_ORGANIZATION_OPTIONS_SUCCESS,
  FETCH_ORGANIZATION_OPTIONS,
} from './constants';

export const initialState = {
  error: null,
  loading: false,
  organizationOptions: [],
};

/* eslint-disable default-case, no-param-reassign */
const overviewReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_ORGANIZATION_OPTIONS_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_ORGANIZATION_OPTIONS_SUCCESS: {
      const { getOrganizations } = payload;
      draft.loading = false;
      draft.organizationOptions = getOrganizations;
      break;
    }
    case FETCH_ORGANIZATION_OPTIONS: {
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default overviewReducer;

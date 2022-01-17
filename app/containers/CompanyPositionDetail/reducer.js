/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_POSITION_DETAIL_FAILURE,
  FETCH_POSITION_DETAIL_SUCCESS,
  FETCH_POSITION_DETAIL,
} from './constants';

export const initialState = {
  error: false,
  loading: false,
  position: {},
};

const companyPositionDetailReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_POSITION_DETAIL_FAILURE: {
      draft.error = true;
      draft.loading = false;
      break;
    }
    case FETCH_POSITION_DETAIL_SUCCESS: {
      const { position } = payload;
      draft.loading = false;
      draft.position = position;
      break;
    }
    case FETCH_POSITION_DETAIL: {
      draft.error = initialState.error;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default companyPositionDetailReducer;

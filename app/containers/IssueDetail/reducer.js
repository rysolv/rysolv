import produce from 'immer';
import {
  CLEAR_ALERTS,
  FETCH_ISSUE_DETAIL_FAILURE,
  FETCH_ISSUE_DETAIL_SUCCESS,
  FETCH_ISSUE_DETAIL,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  issueDetail: {},
  loading: {
    issueDetail: false,
  },
  error: {
    issueDetail: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const issueDetailReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case FETCH_ISSUE_DETAIL_FAILURE: {
      const { error } = payload;
      draft.error.issueDetail = error;
      draft.loading.issueDetail = false;
      break;
    }
    case FETCH_ISSUE_DETAIL_SUCCESS: {
      const { issueDetail } = payload;
      draft.issueDetail = issueDetail;
      draft.loading.issueDetail = false;
      break;
    }
    case FETCH_ISSUE_DETAIL: {
      draft.loading.issueDetail = true;
      break;
    }
  }
}, initialState);

export default issueDetailReducer;

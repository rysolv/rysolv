/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CHANGE_FILTER,
  FETCH_JOBS_BOARD_FAILURE,
  FETCH_JOBS_BOARD_SUCCESS,
  FETCH_JOBS_BOARD,
} from './constants';

export const initialState = {
  error: false,
  filter: '',
  loading: {
    fetchJobsBoard: true,
  },
  jobs: [],
};

const jobsBoardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_FILTER: {
      const { filter } = payload;
      draft.filter = filter;
      break;
    }
    case FETCH_JOBS_BOARD_FAILURE: {
      draft.error = true;
      draft.loading.fetchJobsBoard = false;
      break;
    }
    case FETCH_JOBS_BOARD_SUCCESS: {
      const { jobs } = payload;
      draft.jobs = jobs;
      draft.loading.fetchJobsBoard = false;
      break;
    }
    case FETCH_JOBS_BOARD: {
      draft.error = initialState.error;
      draft.loading.fetchJobsBoard = true;
      break;
    }
  }
}, initialState);

export default jobsBoardReducer;

/* eslint-disable default-case, no-param-reassign */
import produce from 'immer';

import {
  CLOSE_MODAL_STATE,
  FETCH_WATCH_LIST_FAILURE,
  FETCH_WATCH_LIST_SUCCESS,
  FETCH_WATCH_LIST,
  OPEN_MODAL_STATE,
} from './constants';

export const initialState = {
  isModalOpen: { issueWatchList: false, userWatchList: false },
  error: null,
  loading: false,
  modal: '',
  tableData: [],
};

const mainReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLOSE_MODAL_STATE: {
      const { modalState } = payload;
      draft.isModalOpen[modalState] = false;
      draft.modal = initialState.modal;
      draft.tableData = initialState.tableData;
      break;
    }
    case FETCH_WATCH_LIST_FAILURE: {
      draft.loading = false;
      break;
    }
    case FETCH_WATCH_LIST_SUCCESS: {
      draft.loading = false;
      break;
    }
    case FETCH_WATCH_LIST: {
      draft.loading = true;
      break;
    }
    case OPEN_MODAL_STATE: {
      const { modalState, tableData } = payload;
      console.log(tableData);
      draft.isModalOpen[modalState] = true;
      draft.modal = modalState;
      draft.tableData = tableData || [];
      break;
    }
  }
}, initialState);

export default mainReducer;

/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CLOSE_MODAL_STATE,
  FETCH_ATTEMPT_LIST_RESPONSE,
  FETCH_ATTEMPT_LIST,
  FETCH_PULL_REQUEST_LIST_RESPONSE,
  FETCH_PULL_REQUEST_LIST,
  FETCH_WATCH_LIST_RESPONSE,
  FETCH_WATCH_LIST,
  OPEN_MODAL_STATE,
  RESET_STATE,
  UPDATE_PAYMENT_MODAL,
} from './constants';

export const initialState = {
  isModalOpen: false,
  error: null,
  loading: false,
  modal: '',
  tableData: [],
};

const mainReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = initialState.isModalOpen;
      draft.modal = initialState.modal;
      draft.tableData = initialState.tableData;
      break;
    }
    case FETCH_ATTEMPT_LIST_RESPONSE: {
      draft.loading = false;
      break;
    }
    case FETCH_ATTEMPT_LIST: {
      draft.loading = true;
      break;
    }
    case FETCH_PULL_REQUEST_LIST_RESPONSE: {
      draft.loading = false;
      break;
    }
    case FETCH_PULL_REQUEST_LIST: {
      draft.loading = true;
      break;
    }
    case FETCH_WATCH_LIST_RESPONSE: {
      draft.loading = false;
      break;
    }
    case FETCH_WATCH_LIST: {
      draft.loading = true;
      break;
    }
    case OPEN_MODAL_STATE: {
      const { modalState, tableData } = payload;
      draft.isModalOpen = true;
      draft.modal = modalState;
      draft.tableData = tableData || [];
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
    case UPDATE_PAYMENT_MODAL: {
      const { balance, fundedAmount } = payload;
      draft.tableData.balance = balance;
      draft.tableData.fundedAmount = fundedAmount;
      break;
    }
  }
}, initialState);

export default mainReducer;

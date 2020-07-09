import produce from 'immer';

import {
  CLEAR_ALERTS,
  CLOSE_MODAL_STATE,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  INPUT_CHANGE,
  OPEN_MODAL_STATE,
  REMOVE_ISSUE_FAILURE,
  REMOVE_ISSUE_SUCCESS,
  REMOVE_ISSUE,
  SAVE_CHANGE_FAILURE,
  SAVE_CHANGE_SUCCESS,
  SAVE_CHANGE,
  SUBMIT_PAYMENT,
  WITHDRAW_FUNDS_FAILURE,
  WITHDRAW_FUNDS_SUCCESS,
  WITHDRAW_FUNDS,
} from './constants';

export const initialState = {
  account: {},
  alerts: { error: false, success: false },
  error: false,
  filter: {
    language: [],
    overview: 'Newest',
    users: 'All',
  },
  isModalOpen: false,
  loading: false,
  modal: '',
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = initialState.isModalOpen;
      draft.modal = initialState.modal;
      break;
    }
    case DELETE_USER_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case DELETE_USER_SUCCESS: {
      draft.loading = false;
      break;
    }
    case DELETE_USER: {
      draft.loading = true;
      break;
    }
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { oneUser } = payload;
      draft.loading = false;
      draft.account = oneUser;
      break;
    }
    case FETCH_INFO: {
      draft.error = false;
      draft.loading = true;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      if (form === 'filter') {
        draft[form][field] = value;
      } else if (field === 'preferredLanguages') {
        draft[form][field].value = [];
        value.map(language => draft[form][field].value.push(language.value));
      } else {
        draft[form][field].value = value;
      }
      break;
    }
    case OPEN_MODAL_STATE: {
      const { modalState } = payload;
      draft.isModalOpen = true;
      draft.modal = modalState;
      break;
    }
    case REMOVE_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case REMOVE_ISSUE_SUCCESS: {
      const { column, issueId } = payload;
      if (column === 'attempting') {
        draft.account.attempting = draft.account.attempting.filter(
          issue => issue.id !== issueId,
        );
      }
      if (column === 'watching') {
        draft.account.watching = draft.account.watching.filter(
          issue => issue.id !== issueId,
        );
      }
      draft.loading = false;
      break;
    }
    case REMOVE_ISSUE: {
      draft.loading = true;
      break;
    }
    case SAVE_CHANGE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case SAVE_CHANGE_SUCCESS: {
      const { message } = payload;
      draft.loading = false;
      draft.alerts.success = { message };
      break;
    }
    case SAVE_CHANGE: {
      draft.loading = true;
      break;
    }
    case SUBMIT_PAYMENT: {
      draft.loading = true;
      break;
    }
    case WITHDRAW_FUNDS_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case WITHDRAW_FUNDS_SUCCESS: {
      const { balance, message } = payload;
      draft.loading = false;
      draft.account.balance = balance;
      draft.alerts.success = { message };
      break;
    }
    case WITHDRAW_FUNDS: {
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default settingsReducer;

/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  ACCEPT_BOUNTY_FAILURE,
  ACCEPT_BOUNTY_SUCCESS,
  ACCEPT_BOUNTY,
  CHANGE_EMAIL_FAILURE,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  CLOSE_MODAL_STATE,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  INPUT_CHANGE,
  INPUT_ERROR,
  OPEN_MODAL_STATE,
  PAYPAL_PAYMENT_FAILURE,
  PAYPAL_PAYMENT_SUCCESS,
  PAYPAL_PAYMENT,
  REMOVE_ISSUE_FAILURE,
  REMOVE_ISSUE_SUCCESS,
  RESET_STATE,
  SAVE_CHANGE_FAILURE,
  SAVE_CHANGE_SUCCESS,
  SAVE_CHANGE,
  STRIPE_TOKEN_FAILURE,
  STRIPE_TOKEN_SUCCESS,
  STRIPE_TOKEN,
  VERIFY_ACCOUNT_FAILURE,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT,
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
  inputErrors: {
    depositValue: '',
    email: '',
    firstName: '',
    githubLink: '',
    lastName: '',
    personalLink: '',
    receiveWeeklyEmails: '',
    stackoverflowLink: '',
    transferValue: '',
    username: '',
  },
  isModalOpen: false,
  loading: true,
  modal: '',
};

const settingsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case ACCEPT_BOUNTY_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case ACCEPT_BOUNTY_SUCCESS: {
      const { fundedAmount, fundingId } = payload;
      draft.account.bounties.forEach((bounty, i) => {
        if (bounty.id === fundingId) {
          draft.account.bounties[i].userAccepted = true;
          draft.account.bounties[i].userPayout = fundedAmount;
        }
      });
      draft.loading = false;
      break;
    }
    case ACCEPT_BOUNTY: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
    case CHANGE_EMAIL_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case CHANGE_EMAIL_SUCCESS: {
      draft.loading = false;
      break;
    }
    case CHANGE_EMAIL: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      draft.inputErrors = initialState.inputErrors;
      break;
    }
    case CLEAR_ERRORS: {
      draft.inputErrors = initialState.inputErrors;
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
      const { user } = payload;
      draft.account = user;
      draft.loading = false;
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
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.inputErrors[field] = errors[field] || '';
      });
      break;
    }
    case OPEN_MODAL_STATE: {
      const { bounty, fundingId, modalState, repoName } = payload;
      if (modalState === 'acceptBounty') {
        draft.account.fundingId = fundingId;
        draft.account.repoName = repoName;
        draft.account.selectedBounty = bounty;
      }
      draft.isModalOpen = true;
      draft.modal = modalState;
      break;
    }
    case PAYPAL_PAYMENT_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case PAYPAL_PAYMENT_SUCCESS: {
      const { balance, message } = payload;
      draft.account.balance = balance;
      draft.alerts.success = { message };
      draft.loading = false;
      break;
    }
    case PAYPAL_PAYMENT: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
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
    case RESET_STATE: {
      return initialState;
    }
    case SAVE_CHANGE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case SAVE_CHANGE_SUCCESS: {
      const { field, message, value } = payload;
      draft.loading = false;
      draft.account[field] = value;
      draft.alerts.success = { message };
      break;
    }
    case SAVE_CHANGE: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
    case STRIPE_TOKEN_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case STRIPE_TOKEN_SUCCESS: {
      const { balance, message } = payload;
      draft.account.balance = balance;
      draft.alerts.success = { message };
      draft.loading = false;
      break;
    }
    case STRIPE_TOKEN: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
    case VERIFY_ACCOUNT_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case VERIFY_ACCOUNT_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      break;
    }
    case VERIFY_ACCOUNT: {
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

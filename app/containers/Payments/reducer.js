/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CLEAR_ALERTS,
  INPUT_ERROR,
  PAYPAL_PAYMENT_FAILURE,
  PAYPAL_PAYMENT_SUCCESS,
  PAYPAL_PAYMENT,
  RESET_STATE,
  STRIPE_TOKEN_FAILURE,
  STRIPE_TOKEN_SUCCESS,
  STRIPE_TOKEN,
  SUBMIT_ACCOUNT_PAYMENT_FAILURE,
  SUBMIT_ACCOUNT_PAYMENT_SUCCESS,
  SUBMIT_ACCOUNT_PAYMENT,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  errors: {
    email: '',
    firstName: '',
    fundValue: '',
    lastName: '',
  },
  loading: false,
};

const paymentReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.errors[field] = errors[field] || '';
      });
      break;
    }
    case PAYPAL_PAYMENT_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case PAYPAL_PAYMENT_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading = false;
      break;
    }
    case PAYPAL_PAYMENT: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
    case STRIPE_TOKEN_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case STRIPE_TOKEN_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading = false;
      break;
    }
    case STRIPE_TOKEN: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
    case SUBMIT_ACCOUNT_PAYMENT_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case SUBMIT_ACCOUNT_PAYMENT_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading = false;
      break;
    }
    case SUBMIT_ACCOUNT_PAYMENT: {
      draft.alerts = initialState.alerts;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default paymentReducer;

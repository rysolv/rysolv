/* eslint-disable prettier/prettier */
import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';
import { updateActiveUser } from 'containers/Auth/actions';
import { updateFundedIssue } from 'containers/Issues/actions';
import { updatePaymentModal } from 'containers/Main/actions';

import {
  paypalPaymentFailure,
  paypalPaymentSuccess,
  stripeTokenFailure,
  stripeTokenSuccess,
  submitAccountPaymentFailure,
  submitAccountPaymentSuccess,
} from './actions';
import { PAYPAL_PAYMENT, STRIPE_TOKEN, SUBMIT_ACCOUNT_PAYMENT } from './constants';

export function* paypalPaymentSaga({ payload }) {
  try {
    const { amount, error, issueId, userId } = payload;
    const isFundedFromOverview = window.location.pathname === '/issues';
    const valuesToSend = userId
      ? `amount: ${amount}, issueId: "${issueId}", userId: "${userId}"`
      : `amount: ${amount}, issueId: "${issueId}"`;
    const query = `
      mutation {
        createPaypalPayment(${valuesToSend}) {
          __typename
          ... on Payment {
            fundedAmount
            message
          }
          ... on Error {
            message
          }
        }
      }
    `;
    if (error) {
      throw new Error(error);
    }
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        createPaypalPayment: { __typename, fundedAmount, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(paypalPaymentSuccess({ message }));
    yield put(
      updateFundedIssue({ fundedAmount, isFundedFromOverview, issueId }),
    );
    yield put(updatePaymentModal({ fundedAmount }));
  } catch (error) {
    yield put(paypalPaymentFailure({ error: { message: error } }));
  }
}

export function* stripeTokenSaga({ payload }) {
  try {
    const { amount, issueId, token: { id }, userId } = payload;
    const isFundedFromOverview = window.location.pathname === '/issues';
    const valuesToSend = userId
      ? `amount: ${amount}, issueId: "${issueId}", token: "${id}", userId: "${userId}"`
      : `amount: ${amount}, issueId: "${issueId}", token: "${id}"`;
    const query = `
    mutation {
      createStripeCharge(${valuesToSend}) {
        __typename
        ... on Payment {
          fundedAmount,
          message,
        }
        ... on Error {
          message
        }
      }
    }
  `;
    const request = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        createStripeCharge: { __typename, fundedAmount, message },
      },
    } = yield call(post, '/graphql', request);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(stripeTokenSuccess({ message }));
    yield put(
      updateFundedIssue({ fundedAmount, isFundedFromOverview, issueId }),
    );
    yield put(updatePaymentModal({ fundedAmount }));
  } catch (error) {
    yield put(stripeTokenFailure({ error: { message: error } }));
  }
}

export function* submitAccountPaymentSaga({ payload }) {
  const { fundValue, issueId, userId } = payload;
  const isFundedFromOverview = window.location.pathname === '/issues';
  const submitAccountPaymentQuery = `
      mutation {
        submitAccountPayment(fundValue: ${fundValue}, issueId: "${issueId}", userId: "${userId}" ) {
          __typename
          ... on Payment {
            balance,
            fundedAmount,
            message,
          }
          ... on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({
      query: submitAccountPaymentQuery,
      variables: {},
    });
    const {
      data: { submitAccountPayment },
    } = yield call(post, '/graphql', graphql);
    const { balance, fundedAmount, message } = submitAccountPayment;
    yield put(submitAccountPaymentSuccess({ message }));
    yield put(updateActiveUser({ balance }));
    yield put(
      updateFundedIssue({ fundedAmount, isFundedFromOverview, issueId }),
    );
    yield put(updatePaymentModal({ balance, fundedAmount }));
  } catch (error) {
    yield put(submitAccountPaymentFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(PAYPAL_PAYMENT, paypalPaymentSaga);
  yield takeLatest(STRIPE_TOKEN, stripeTokenSaga);
  yield takeLatest(SUBMIT_ACCOUNT_PAYMENT, submitAccountPaymentSaga);
}

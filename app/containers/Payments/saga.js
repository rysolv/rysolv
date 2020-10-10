import { call, put, takeLatest } from 'redux-saga/effects';

import { updateActiveUser } from 'containers/Auth/actions';
import { updateFundedIssue } from 'containers/Issues/actions';
import { updatePaymentModal } from 'containers/Main/actions';

import { fetchCurrentSession } from 'utils/authHelper';
import { post } from 'utils/request';

import {
  paypalPaymentFailure,
  paypalPaymentSuccess,
  stripeTokenFailure,
  stripeTokenSuccess,
  submitAccountPaymentFailure,
  submitAccountPaymentSuccess,
} from './actions';
import {
  PAYPAL_PAYMENT,
  STRIPE_TOKEN,
  SUBMIT_ACCOUNT_PAYMENT,
} from './constants';

export function* paypalPaymentSaga({ payload }) {
  const { amount, error: paypalError, issueId } = payload;
  const isFundedFromOverview = window.location.pathname === '/issues';
  const query = `
    mutation {
      createPaypalPayment(amount: ${amount}, issueId: "${issueId}") {
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

  try {
    const token = yield call(fetchCurrentSession);

    if (paypalError) throw paypalError;

    const graphql = JSON.stringify({
      query,
      variables: { token },
    });
    const {
      data: {
        createPaypalPayment: { __typename, fundedAmount, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
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
  const {
    amount,
    issueId,
    token: { id },
  } = payload;
  const isFundedFromOverview = window.location.pathname === '/issues';

  const query = `
      mutation {
        createStripeCharge(amount: ${amount}, issueId: "${issueId}", token: "${id}") {
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

  try {
    const token = yield call(fetchCurrentSession);

    const request = JSON.stringify({
      query,
      variables: { token },
    });
    const {
      data: {
        createStripeCharge: { __typename, fundedAmount, message },
      },
    } = yield call(post, '/graphql', request);
    if (__typename === 'Error') throw message;
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
  const { fundValue, issueId } = payload;
  const isFundedFromOverview = window.location.pathname === '/issues';
  const submitAccountPaymentQuery = `
    mutation {
      submitAccountPayment(fundValue: ${fundValue}, issueId: "${issueId}") {
        __typename
        ... on Payment {
          balance
          fundedAmount
          message
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const token = yield call(fetchCurrentSession);

    const graphql = JSON.stringify({
      query: submitAccountPaymentQuery,
      variables: { token },
    });
    const {
      data: {
        submitAccountPayment: { __typename, balance, fundedAmount, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(submitAccountPaymentSuccess({ message }));
    yield put(updateActiveUser({ balance }));
    yield put(
      updateFundedIssue({ fundedAmount, isFundedFromOverview, issueId }),
    );
    yield put(updatePaymentModal({ balance, fundedAmount }));
  } catch (error) {
    yield put(submitAccountPaymentFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(PAYPAL_PAYMENT, paypalPaymentSaga);
  yield takeLatest(STRIPE_TOKEN, stripeTokenSaga);
  yield takeLatest(SUBMIT_ACCOUNT_PAYMENT, submitAccountPaymentSaga);
}

/* eslint-disable prettier/prettier */
import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';
import { updateActiveUser } from 'containers/Auth/actions';
import { updateFundedIssue } from 'containers/Issues/actions';
import { updatePaymentModal } from 'containers/Main/actions';

import {
  stripeTokenFailure,
  stripeTokenSuccess,
  submitAccountPaymentFailure,
  submitAccountPaymentSuccess,
} from './actions';
import { STRIPE_TOKEN, SUBMIT_ACCOUNT_PAYMENT } from './constants';

export function* stripeTokenSaga({ payload }) {
  try {
    const { amount, issueId, organizationId, token, userId } = payload;
    const isFundedFromOverview = window.location.pathname === '/issues';
    const valuesToSend = userId
      ? `amount: ${amount}, issueId: "${issueId}", organizationId: "${organizationId}", token: "${token.id}", userId: "${userId}"`
      : `amount: ${amount}, issueId: "${issueId}", organizationId: "${organizationId}", token: "${token.id}"`;
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
    yield put(stripeTokenFailure({ error }));
  }
}

export function* submitAccountPaymentSaga({ payload }) {
  const { fundValue, issueId, organizationId, userId } = payload;
  const isFundedFromOverview = window.location.pathname === '/issues';
  const submitAccountPaymentQuery = `
      mutation {
        submitAccountPayment(fundValue: ${fundValue}, issueId: "${issueId}", organizationId: "${organizationId}", userId: "${userId}" ) {
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
  yield takeLatest(STRIPE_TOKEN, stripeTokenSaga);
  yield takeLatest(SUBMIT_ACCOUNT_PAYMENT, submitAccountPaymentSaga);
}

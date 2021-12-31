/* eslint-disable camelcase */
import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  editUserFailure,
  editUserSuccess,
  fetchContractFailure,
  fetchContractSuccess,
  fetchPlaidTokenFailure,
  fetchPlaidTokenSuccess,
  fetchUserFailure,
  fetchUserSuccess,
  openModalState,
  submitContractAcceptedFailure,
  submitContractAcceptedSuccess,
  updatePaymentMethodFailure,
  updatePaymentMethodSuccess,
} from './actions';
import {
  EDIT_USER,
  FETCH_CONTRACT,
  FETCH_PLAID_TOKEN,
  FETCH_USER,
  SUBMIT_CONTRACT_ACCEPTED,
  UPDATE_PAYMENT_METHOD,
} from './constants';

export function* fetchContractSaga({ payload }) {
  const { plan } = payload;
  const query = `
    query{
      getContract(plan: "${plan}") {
        __typename
        ... on Contract {
          body
          key
          subtitle
          title
          version
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getContract: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchContractSuccess({ contract: restProps }));
  } catch (error) {
    yield put(fetchContractFailure({ error }));
  }
}

export function* editUserSaga({ payload }) {
  const { field, value } = payload;
  const query = `
    mutation {
      transformUser(userInput: {${field}: "${value}"}) {
        __typename
        ... on Success {
          message
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        transformUser: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(
      editUserSuccess({
        field,
        message,
        value,
      }),
    );
  } catch (error) {
    yield put(editUserFailure({ error: { message: error } }));
  }
}

export function* fetchPlaidTokenSaga() {
  const query = `
    query{
      getPlaidToken{
        __typename
        ... on Success {
          message
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getPlaidToken: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchPlaidTokenSuccess({ token: message }));
  } catch (error) {
    yield put(fetchPlaidTokenFailure({ error }));
  }
}

export function* fetchUserSaga({ payload }) {
  const { userId } = payload;
  const query = `
    query {
      oneUser(userId: "${userId}") {
        __typename
        ... on User {
          email
          firstName
          lastName
          username
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        oneUser: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    yield put(fetchUserSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchUserFailure({ error: { message: error } }));
  }
}

export function* submitContractAcceptedSaga({ payload }) {
  const { companyId, paymentConfirmed, plan } = payload;
  const query = `
      mutation {
        postContractAccepted(companyId: "${companyId}", plan: "${plan}") {
          __typename
          ... on Success {
            message
          }
          ... on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        postContractAccepted: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(submitContractAcceptedSuccess());
    if (paymentConfirmed) {
      yield put(openModalState({ modalState: 'contractConfirmation' }));
    } else {
      yield put(openModalState({ modalState: 'payment' }));
    }
  } catch (error) {
    yield put(submitContractAcceptedFailure({ error }));
  }
}

export function* updatePaymentMethodSaga({ payload }) {
  const { metadata, provider, token } = payload;
  const { account_id, institution, account, last4, brand } = metadata;

  const accountDetails =
    provider === 'stripe'
      ? `{
          brand: "${brand}",
          mask: "${last4}"
        }`
      : `{
            accountId: "${account_id}",
            accountName: "${account.name}",
            bank: "${institution.name}",
            mask: "${account.mask}"
         }`;

  const query = `
    mutation {
      updatePaymentMethod(
        metadata: ${accountDetails}
        provider: "${provider}"
        token: "${token}"
      ) {
        __typename
        ... on Success {
          message
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        updatePaymentMethod: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(updatePaymentMethodSuccess());
    yield put(openModalState({ modalState: 'paymentConfirmation' }));
  } catch (error) {
    yield put(updatePaymentMethodFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(EDIT_USER, editUserSaga);
  yield takeLatest(FETCH_CONTRACT, fetchContractSaga);
  yield takeLatest(FETCH_PLAID_TOKEN, fetchPlaidTokenSaga);
  yield takeLatest(FETCH_USER, fetchUserSaga);
  yield takeLatest(SUBMIT_CONTRACT_ACCEPTED, submitContractAcceptedSaga);
  yield takeLatest(UPDATE_PAYMENT_METHOD, updatePaymentMethodSaga);
}

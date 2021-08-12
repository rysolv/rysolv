import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { sendFormFailure, sendFormSuccess } from './actions';
import { SEND_FORM } from './constants';

export function* sendFormSaga({ payload }) {
  const { company, email, name, url } = payload;
  const query = `
    mutation {
      recruitingSignup(
        contactInput: {
          companyName: "${company}"
          companyUrl: "${url}"
          contactName: "${name}"
          email: ${JSON.stringify(email)}
        }
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
        recruitingSignup: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield delay(500);
    yield put(sendFormSuccess());
  } catch (error) {
    yield delay(500);
    yield put(sendFormFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(SEND_FORM, sendFormSaga);
}

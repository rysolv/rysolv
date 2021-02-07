import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { submitEmailFailure, submitEmailSuccess } from './actions';
import { SUBMIT_EMAIL } from './constants';

export function* submitEmailSaga({ payload }) {
  const { email } = payload;
  const query = `
    query{
      submitEmail(email: "${email}")  {
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
    yield call(post, '/graphql', graphql);
    yield put(submitEmailSuccess());
  } catch (error) {
    yield put(submitEmailFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(SUBMIT_EMAIL, submitEmailSaga);
}

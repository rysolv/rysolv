import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { submitJobInfoFailure, submitJobInfoSuccess } from './actions';
import { SUBMIT_JOB_INFO } from './constants';

export function* submitJobInfoSaga({ payload }) {
  const { requestBody } = payload;
  const { email } = requestBody;
  const query = `
    query{
      submitJobInfo(email: "${email}")  {
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
    yield put(submitJobInfoSuccess());
  } catch (error) {
    yield put(submitJobInfoFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(SUBMIT_JOB_INFO, submitJobInfoSaga);
}

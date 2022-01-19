import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { fetchJobsBoardFailure, fetchJobsBoardSuccess } from './actions';
import { FETCH_JOBS_BOARD } from './constants';

export function* fetchJobsBoardSaga() {
  const query = `
    query {
      getPositions {
        companyId
        description
        experience
        id
        isActive
        location
        role
        salary
        skills
        timezone
        title
        type
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getPositions: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchJobsBoardSuccess({ jobs: restProps }));
  } catch (error) {
    yield put(fetchJobsBoardFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_JOBS_BOARD, fetchJobsBoardSaga);
}

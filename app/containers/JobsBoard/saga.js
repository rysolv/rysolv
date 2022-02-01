import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { fetchJobsBoardFailure, fetchJobsBoardSuccess } from './actions';
import { FETCH_JOBS_BOARD } from './constants';

export function* fetchJobsBoardSaga() {
  const query = `
    query {
      getPositions {
        companyLogo
        companyName
        createdDate
        id
        location
        positionData
        role
        skills
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: { getPositions },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchJobsBoardSuccess({ jobs: getPositions }));
  } catch (error) {
    yield put(fetchJobsBoardFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_JOBS_BOARD, fetchJobsBoardSaga);
}

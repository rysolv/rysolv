import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { FETCH_ACTIVE_USER } from './constants';
import { fetchActiveUserFailure, fetchActiveUserSuccess } from './actions';

export function* fetchActiveUserSaga({ payload }) {
  const { userId } = payload;
  try {
    const query = `
    query{
      oneUser(column: "id", query: "${userId}") {
        attempting,
        id,
        profilePic,
        rep,
        username,
        watching,
        pullRequests
      }
    }`;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneUser },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchActiveUserSuccess({ oneUser }));
  } catch (error) {
    yield put(fetchActiveUserFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ACTIVE_USER, fetchActiveUserSaga);
}

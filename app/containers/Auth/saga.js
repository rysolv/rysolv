import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from 'utils/request';

import { FETCH_ACTIVE_USER, LOGIN, LOGOUT } from './constants';
import {
  fetchActiveUserFailure,
  fetchActiveUserSuccess,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
} from './actions';

export function* loginSaga({ payload }) {
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
        pullRequests,
        upvotes
      }
    }`;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneUser },
    } = yield call(post, '/graphql', graphql);
    yield put(loginSuccess({ oneUser }));
  } catch (error) {
    yield put(loginFailure({ error }));
  }
}

export function* logoutSaga({ payload }) {
  const { userId } = payload;
  try {
    console.log(`Loging out - ${userId}`);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure({ error }));
  }
}

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
        pullRequests,
        upvotes
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
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from 'utils/request';
import { setCookie, clearCookie } from './helpers';

import { FETCH_ACTIVE_USER, SIGNIN, SIGNOUT } from './constants';
import {
  fetchActiveUserFailure,
  fetchActiveUserSuccess,
  signinFailure,
  signinSuccess,
  signoutFailure,
  signoutSuccess,
} from './actions';

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

export function* signinSaga({ payload }) {
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
    yield put(signinSuccess({ oneUser }));
    setCookie({ userId });
  } catch (error) {
    yield put(signinFailure({ error }));
  }
}

export function* signoutSaga() {
  try {
    clearCookie('userId');
    yield put(signoutSuccess());
  } catch (error) {
    yield put(signoutFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ACTIVE_USER, fetchActiveUserSaga);
  yield takeLatest(SIGNIN, signinSaga);
  yield takeLatest(SIGNOUT, signoutSaga);
}

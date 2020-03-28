import { call, put, takeLatest } from 'redux-saga/effects';
import { del, get, post } from 'utils/request';

import { DELETE_USER, FETCH_USERS, SAVE_INFO, SEARCH_USERS } from './constants';
import {
  deleteUserFailure,
  deleteUserSuccess,
  fetchUsersFailure,
  fetchUsersSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchUsersFailure,
  searchUsersSuccess,
} from './actions';

export function* deleteUserSaga({ payload }) {
  const { userId } = payload;
  try {
    const endpoint = `/api/users/${userId}`;
    const { message } = yield call(del, endpoint);
    yield put(deleteUserSuccess({ message }));
  } catch (error) {
    yield put(deleteUserFailure({ error }));
  }
}

export function* fetchUsersSaga() {
  try {
    const { users } = yield call(get, `/api/users`);
    yield put(fetchUsersSuccess({ users }));
  } catch (error) {
    yield put(fetchUsersFailure({ error }));
  }
}

export function* saveInfoSaga() {
  try {
    const { message } = yield call(post, `/api/users`);
    yield put(saveInfoSuccess({ message }));
  } catch (error) {
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchUsersSaga({ payload }) {
  const { name } = payload;
  try {
    const { users } = yield call(get, `/api/users/search?user=${name}`);
    yield put(searchUsersSuccess({ users }));
  } catch (error) {
    yield put(searchUsersFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_USERS, searchUsersSaga);
}

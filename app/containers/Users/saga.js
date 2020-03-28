import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'utils/request';
import { FETCH_USERS, SEARCH_USERS } from './constants';
import {
  fetchUsersFailure,
  fetchUsersSuccess,
  searchUsersFailure,
  searchUsersSuccess,
} from './actions';

export function* fetchUsersSaga() {
  try {
    const { users } = yield call(get, `/api/users`);
    yield put(fetchUsersSuccess({ users }));
  } catch (error) {
    yield put(fetchUsersFailure({ error }));
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
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(SEARCH_USERS, searchUsersSaga);
}

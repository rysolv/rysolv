import { call, put, takeLatest } from 'redux-saga/effects';
import { get, post } from 'utils/request';
import { FETCH_USERS, SAVE_INFO, SEARCH_USERS } from './constants';
import {
  fetchUsersFailure,
  fetchUsersSuccess,
  saveInfoFailure,
  saveInfoSuccess,
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
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_USERS, searchUsersSaga);
}

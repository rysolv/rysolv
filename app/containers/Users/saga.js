import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'utils/request';
import { FETCH_USERS } from './constants';
import { fetchUsersFailure, fetchUsersSuccess } from './actions';

export function* fetchUsersSaga() {
  try {
    const { users } = yield call(get, `/api/users`);
    yield put(fetchUsersSuccess({ users }));
  } catch (error) {
    yield put(fetchUsersFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
}

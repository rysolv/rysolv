import { call, put, takeLatest } from 'redux-saga/effects';
import { del, get, post } from 'utils/request';

import {
  DELETE_USER,
  FETCH_INFO,
  FETCH_USERS,
  SAVE_INFO,
  SEARCH_USERS,
  UPDATE_INFO,
} from './constants';
import {
  deleteUserFailure,
  deleteUserSuccess,
  fetchInfoFailure,
  fetchInfoSuccess,
  fetchUsersFailure,
  fetchUsersSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchUsersFailure,
  searchUsersSuccess,
  updateInfoFailure,
  updateInfoSuccess,
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

export function* fetchInfoSaga({ payload }) {
  const { userId } = payload;
  try {
    const { user } = yield call(get, `/api/users/${userId}`);
    yield put(fetchInfoSuccess({ user }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* fetchUsersSaga() {
  const query = `
    query {
      getUsers {
        id,
        created_date,
        modified_date,
        first_name,
        last_name,
        email,
        watching_list,
        rep,
        profile_pic
      }
    }
  `;

  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const { data } = yield call(post, '/graphql', graphql);
    yield put(fetchUsersSuccess(data));
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

export function* updateInfoSaga({ payload }) {
  const { userId, editInfo } = payload;
  try {
    const { message } = yield call(post, `/api/users/${userId}`, editInfo);
    yield put(updateInfoSuccess({ message }));
  } catch (error) {
    yield put(updateInfoFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_USERS, searchUsersSaga);
  yield takeLatest(UPDATE_INFO, updateInfoSaga);
}

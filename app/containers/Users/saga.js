import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from 'utils/request';
import { FETCH_USERS } from './constants';
import { fetchUsersFailure, fetchUsersSuccess } from './actions';

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
    console.log(data);
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
}

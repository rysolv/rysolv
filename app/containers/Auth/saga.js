import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from 'utils/request';
import { setCookie, clearCookie } from './helpers';

import {
  FETCH_ACTIVE_USER,
  SEARCH_ORGANIZATIONS,
  SIGNIN,
  SIGNOUT,
} from './constants';
import {
  fetchActiveUserFailure,
  fetchActiveUserSuccess,
  searchOrganizationsFailure,
  searchOrganizationsSuccess,
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
      oneUser(id: "${userId}") {
        attempting,
        balance,
        id,
        issues,
        organizations,
        profilePic,
        pullRequests,
        rep,
        upvotes,
        username,
        watching,
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
      oneUser(id: "${userId}") {
        attempting,
        balance,
        id,
        issues,
        organizations,
        profilePic,
        pullRequests,
        rep,
        upvotes,
        username,
        watching,
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

export function* getUserOrganizationsSaga({ payload }) {
  const { id } = payload;
  const query = `
  query {
    getUserOrganizations(id: "${id}") {
      id,
      createdDate,
      modifiedDate,
      name,
      description,
      repoUrl,
      organizationUrl,
      issues,
      logo,
      verified,
      totalFunded,
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { getUserOrganizations },
    } = yield call(post, '/graphql', graphql);
    yield put(
      searchOrganizationsSuccess({ organizations: getUserOrganizations }),
    );
  } catch (error) {
    yield put(searchOrganizationsFailure({ error }));
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
  yield takeLatest(SEARCH_ORGANIZATIONS, getUserOrganizationsSaga);
  yield takeLatest(FETCH_ACTIVE_USER, fetchActiveUserSaga);
  yield takeLatest(SIGNIN, signinSaga);
  yield takeLatest(SIGNOUT, signoutSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { FETCH_INFO, FETCH_USERS, SEARCH_USERS } from './constants';
import {
  fetchInfoFailure,
  fetchInfoSuccess,
  fetchUsersFailure,
  fetchUsersSuccess,
  searchUsersFailure,
  searchUsersSuccess,
} from './actions';

export function* fetchInfoSaga({ payload }) {
  const { userId } = payload;
  const query = `
    query {
      oneUser(id: "${userId}") {
        id,
        createdDate,
        firstName,
        lastName,
        rep,
        profilePic,
        attempting,
        issues,
        username,
        githubLink,
        personalLink,
        preferredLanguages,
        stackoverflowLink,
        activePullRequests,
        completedPullRequests,
        dollarsEarned,
        isOnline,
        modifiedDate,
        rejectedPullRequests,
      }
      getUserActivity(userId: "${userId}") {
        activityId,
        createdDate,
        actionType,
        issueId,
        organizationId,
        organizationName,
        pullRequestId,
        userId,
        fundedValue,
        issueName,
        username,
      }
    }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { getUserActivity, oneUser },
    } = yield call(post, '/graphql', graphql);
    oneUser.activity = getUserActivity;
    yield put(fetchInfoSuccess({ oneUser }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* fetchUsersSaga() {
  const query = `
    query {
      getUsers {
        id,
        createdDate,
        firstName,
        lastName,
        rep,
        profilePic,
        attempting,
        issues,
        username,
        preferredLanguages
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { getUsers },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchUsersSuccess({ getUsers }));
  } catch (error) {
    yield put(fetchUsersFailure({ error }));
  }
}

export function* searchUsersSaga({ payload }) {
  const { value } = payload;
  const query = `
  query {
    searchUsers(value: "${value}") {
      id,
      createdDate,
      firstName,
      lastName,
      rep,
      profilePic,
      attempting,
      issues,
      username,
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { searchUsers },
    } = yield call(post, '/graphql', graphql);
    yield put(searchUsersSuccess({ searchUsers }));
  } catch (error) {
    yield put(searchUsersFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(SEARCH_USERS, searchUsersSaga);
}

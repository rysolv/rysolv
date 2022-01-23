import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { fetchUserProfileFailure, fetchUserProfileSuccess } from './actions';
import { FETCH_USER_PROFILE } from './constants';

export function* fetchUserProfileSaga({ payload }) {
  const { username } = payload;
  const query = `
    query {
      getUserProfile(username: "${username}") {
        __typename
        ...on User {
          chartData
          desiredRole
          firstName
          githubLink
          hiringStatus
          lastName
          location
          personalLink
          profilePic
          skills
          stackoverflowLink
          username
        }
        ...on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getUserProfile: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserProfileSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchUserProfileFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_USER_PROFILE, fetchUserProfileSaga);
}

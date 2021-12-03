import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchUserDashboardFailure,
  fetchUserDashboardSuccess,
  setHiringStatusFailure,
  setHiringStatusSuccess,
} from './actions';
import { FETCH_USER_DASHBOARD, SET_HIRING_STATUS } from './constants';

export function* fetchUserDashboardSaga() {
  const query = `
      query {
        getUserDashboard {
          __typename
          ... on User {
            email
            firstName
            githubId
            hiringStatus
            id
            isGithubVerified
            issues
            lastName
            matches
            notifications
            preferredLanguages
            profilePic
            pullRequests
            rep
            repos
            surveyComplete
            unreadMessages
            upvotes
            username
            watching
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
        getUserDashboard: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserDashboardSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchUserDashboardFailure({ error: { message: error } }));
  }
}

export function* setHiringStatusSaga({ payload }) {
  const { hiringStatus } = payload;

  // Hiring status is set to 'active', 'inactive', 'undeclared'
  // We use this to determine whether the user has ever indicated
  // interest in the hiring platform

  const query = `
      mutation {
        setHiringStatus(hiringStatus: "${hiringStatus}") {
          __typename
          ... on Success {
            message
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
        setHiringStatus: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;

    yield put(
      setHiringStatusSuccess({
        hiringStatus,
      }),
    );
  } catch (error) {
    yield put(setHiringStatusFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_USER_DASHBOARD, fetchUserDashboardSaga);
  yield takeLatest(SET_HIRING_STATUS, setHiringStatusSaga);
}

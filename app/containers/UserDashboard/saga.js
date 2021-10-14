import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';
import { getCookie, setCookie } from 'utils/globalHelpers';

import {
  dismissBannerFailure,
  dismissBannerSuccess,
  fetchUserDashboardFailure,
  fetchUserDashboardSuccess,
} from './actions';
import { DISMISS_BANNER, FETCH_USER_DASHBOARD } from './constants';

export function* dismissBannerSaga() {
  try {
    setCookie('dismissBanner', true, {
      expires: 'Sun, 19 Jan 2038 00:00:01 GMT;',
    });

    console.log('GO AWAY BANNER');
    // set cookie here
    //
    //
    yield put(dismissBannerSuccess({ displayBanner: false }));
  } catch (error) {
    yield put(dismissBannerFailure({ error: { message: error } }));
  }
}

export function* fetchUserDashboardSaga() {
  const query = `
      query {
        getUserDashboard {
          __typename
          ... on User {
            email
            firstName
            githubId
            id
            isGithubVerified
            isQuestionnaireComplete
            issues
            lastName
            notifications
            profilePic
            pullRequests
            rep
            repos
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
    const displayBanner = !getCookie('dismissBanner');
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getUserDashboard: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserDashboardSuccess({ displayBanner, user: restProps }));
  } catch (error) {
    yield put(fetchUserDashboardFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DISMISS_BANNER, dismissBannerSaga);
  yield takeLatest(FETCH_USER_DASHBOARD, fetchUserDashboardSaga);
}

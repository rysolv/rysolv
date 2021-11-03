import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';
import { getCookie, setCookie } from 'utils/globalHelpers';

import {
  dismissBannerFailure,
  dismissBannerSuccess,
  fetchUserDashboardFailure,
  fetchUserDashboardSuccess,
  setHiringStatusFailure,
  setHiringStatusSuccess,
} from './actions';
import {
  DISMISS_BANNER,
  FETCH_USER_DASHBOARD,
  SET_HIRING_STATUS,
} from './constants';

export function* dismissBannerSaga() {
  try {
    setCookie('dismissBanner', true, {
      expires: 'Sun, 19 Jan 2038 00:00:01 GMT;',
    });

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
            hiringStatus
            id
            isGithubVerified
            isQuestionnaireComplete
            issues
            lastName
            notifications
            preferredLanguages
            profilePic
            pullRequests
            rep
            repos
            surveyComplete
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

export function* setHiringStatusSaga({ payload }) {
  console.log(payload);
  const { hiringStatus } = payload;
  console.log(hiringStatus);

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
  yield takeLatest(DISMISS_BANNER, dismissBannerSaga);
  yield takeLatest(FETCH_USER_DASHBOARD, fetchUserDashboardSaga);
  yield takeLatest(SET_HIRING_STATUS, setHiringStatusSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { FETCH_INFO } from './constants';
import { fetchInfoFailure, fetchInfoSuccess } from './actions';

export function* fetchInfoSaga({ payload }) {
  const { itemId } = payload;
  const query = `
    query {
      oneUser(column: "id", query: "${itemId}") {
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
        rejectedPullRequests,
      }
    }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneUser },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchInfoSuccess({ oneUser }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
}

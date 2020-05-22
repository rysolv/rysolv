import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { FETCH_INFO, SAVE_CHANGE } from './constants';
import {
  fetchInfo,
  fetchInfoFailure,
  fetchInfoSuccess,
  saveChangeFailure,
  saveChangeSuccess,
} from './actions';

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

export function* saveChangeSaga({ payload }) {
  const { field, itemId, value } = payload;
  const formattedValue =
    field === 'preferredLanguages' ? JSON.stringify(value) : `"${value}"`;
  const query = `
    mutation {
      transformUser(id: "${itemId}", userInput: {
        ${field}: ${formattedValue},
      }) {
        id,
        githubLink,
        personalLink,
        preferredLanguages,
        stackoverflowLink,
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(fetchInfo({ itemId }));
    yield put(
      saveChangeSuccess({
        message: 'User account has been successfully updated.',
      }),
    );
  } catch (error) {
    yield put(saveChangeFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(SAVE_CHANGE, saveChangeSaga);
}

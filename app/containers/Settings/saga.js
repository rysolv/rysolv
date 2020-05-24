import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchActiveUser } from 'containers/Auth/actions';
import { post } from 'utils/request';

import { FETCH_INFO, REMOVE_ISSUE, SAVE_CHANGE } from './constants';
import {
  fetchInfo,
  fetchInfoFailure,
  fetchInfoSuccess,
  removeIssueFailure,
  removeIssueSuccess,
  saveChangeFailure,
  saveChangeSuccess,
} from './actions';

export function* fetchInfoSaga({ payload }) {
  const { itemId } = payload;
  const query = `
    query {
      oneUser(column: "id", query: "${itemId}") {
        id,
        activePullRequests,
        attempting,
        balance,
        completedPullRequests,
        createdDate,
        dollarsEarned,
        email,
        firstName,
        githubLink,
        issues,
        lastName,
        personalLink,
        preferredLanguages,
        profilePic,
        rejectedPullRequests,
        rep,
        stackoverflowLink,
        username,
        watching,
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

export function* removeIssueSaga({ payload }) {
  const { id: issueId, userId, column, remove } = payload;
  const query = `
  mutation {
    updateIssueArray(id: "${issueId}", column: "${column}", data: "${userId}", remove: ${remove}) {
      id,
      attempting,
      watching
    }
    updateUserArray(id: "${userId}", column: "${column}", data: "${issueId}", remove: ${remove}) {
      attempting,
      watching
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(removeIssueSuccess({ column, issueId }));
    yield put(fetchActiveUser({ userId }));
  } catch (error) {
    yield put(removeIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(REMOVE_ISSUE, removeIssueSaga);
  yield takeLatest(SAVE_CHANGE, saveChangeSaga);
}

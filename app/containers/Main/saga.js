import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchAttemptListResponse,
  fetchPullRequestListResponse,
  fetchWatchListResponse,
  openModalState,
} from './actions';
import {
  FETCH_ATTEMPT_LIST,
  FETCH_PULL_REQUEST_LIST,
  FETCH_WATCH_LIST,
} from './constants';

export function* fetchAttemptListSaga({ payload }) {
  const { issueId, modalState } = payload;
  const query = `
    query {
      getIssueAttemptList(issueId: "${issueId}") {
        id,
        profilePic,
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
      data: { getIssueAttemptList },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchAttemptListResponse());
    yield put(openModalState({ modalState, tableData: getIssueAttemptList }));
  } catch (error) {
    yield put(fetchAttemptListResponse());
  }
}

export function* fetchPullRequestListSaga({ payload }) {
  const { activeUserPullRequests, idArray, modalState } = payload;
  const query = `
    query {
      getPullRequestList(idArray: ${JSON.stringify(idArray)}) {
        __typename
        ... on PullRequestList {
          pullRequestList {
            htmlUrl,
            pullRequestId,
            rep,
            title,
            userId,
            username,
          }
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { getPullRequestList },
    } = yield call(post, '/graphql', graphql);
    const { __typename, message, pullRequestList } = getPullRequestList;
    if (__typename === 'Error') throw new Error(message);
    yield put(fetchPullRequestListResponse());
    yield put(
      openModalState({
        modalState,
        tableData: {
          activeUserPullRequests,
          pullRequests: pullRequestList,
        },
      }),
    );
  } catch (error) {
    yield put(fetchPullRequestListResponse());
  }
}

export function* fetchWatchListSaga({ payload }) {
  const { issueId, modalState } = payload;
  const query = `
    query {
      getIssueWatchList(issueId: "${issueId}") {
        id,
        profilePic,
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
      data: { getIssueWatchList },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchWatchListResponse());
    yield put(openModalState({ modalState, tableData: getIssueWatchList }));
  } catch (error) {
    yield put(fetchWatchListResponse());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ATTEMPT_LIST, fetchAttemptListSaga);
  yield takeLatest(FETCH_PULL_REQUEST_LIST, fetchPullRequestListSaga);
  yield takeLatest(FETCH_WATCH_LIST, fetchWatchListSaga);
}

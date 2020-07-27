import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { fetchActiveUser } from 'containers/Auth/actions';
import { updateIssueDetail } from 'containers/Issues/actions';
import {
  createPullRequestFailure,
  createPullRequestSuccess,
  deletePullRequestFailure,
  deletePullRequestSuccess,
  fetchUserPullRequestsFailure,
  fetchUserPullRequestsSuccess,
  importPullRequestFailure,
  importPullRequestSuccess,
} from './actions';
import {
  CREATE_PULL_REQUEST,
  DELETE_PULL_REQUEST,
  FETCH_USER_PULL_REQUESTS,
  IMPORT_PULL_REQUEST,
} from './constants';

export function* createPullRequestSaga({ payload }) {
  const {
    issueId,
    importData: {
      htmlUrl,
      mergeable,
      merged,
      mergeableState,
      open,
      githubUsername,
      pullNumber,
      status,
      title,
    },
    userId,
  } = payload;
  const query = `
    mutation {
      createPullRequest(
        pullRequestInput: {
          githubUsername: "${githubUsername.value}",
          htmlUrl: "${htmlUrl.value}",
          issueId: "${issueId}",
          mergeable: ${mergeable.value},
          mergeableState: "${mergeableState.value}",
          merged: ${merged.value},
          open: ${open.value},
          pullNumber: ${pullNumber.value},
          status: "${status.value}",
          title: "${title.value}"
          userId: "${userId}",
        })
        {
        __typename
        ... on PullRequest {
          pullRequestId
        }
        ... on Error {
          message
        }
      }
    }
  `;

  try {
    const pullRequestQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { createPullRequest },
    } = yield call(post, '/graphql', pullRequestQuery);
    const { __typename, message, pullRequestId } = createPullRequest;
    if (__typename === 'Error') throw message;
    yield put(createPullRequestSuccess({ message: 'Pull Request created' }));
    yield put(fetchActiveUser({ userId }));
    yield put(updateIssueDetail({ pullRequestId }));
  } catch (error) {
    yield put(createPullRequestFailure({ error }));
  }
}

export function* deletePullRequestSaga({ payload }) {
  const { pullRequestId, userId } = payload;
  const query = `
    mutation {
      deletePullRequest(id: "${pullRequestId}")
        {
        __typename
        ... on Success {
          message
        }
        ... on Error {
          message
        }
      }
    }
  `;

  try {
    const pullRequestQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { deletePullRequest },
    } = yield call(post, '/graphql', pullRequestQuery);
    const { __typename, message } = deletePullRequest;
    if (__typename === 'Error') throw new Error(message);
    yield put(
      deletePullRequestSuccess({
        id: pullRequestId,
        message,
      }),
    );
    yield put(fetchActiveUser({ userId }));
  } catch (error) {
    yield put(deletePullRequestFailure({ error }));
  }
}

export function* fetchUserPullRequestsSaga({ payload }) {
  const { userId } = payload;
  const query = `
    query {
      getUserPullRequests(id: "${userId}") {
        __typename
        ... on PullRequestArray {
          pullRequestArray {
            createdDate
            fundedAmount
            githubUsername
            htmlUrl
            issueId
            issueName
            mergeable
            mergeableState
            merged
            modifiedDate
            open
            pullNumber
            pullRequestId
            status
            title
            userId
          }
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const pullRequestQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        getUserPullRequests: { __typename, message, pullRequestArray },
      },
    } = yield call(post, '/graphql', pullRequestQuery);
    if (__typename === 'Error') throw message;

    yield put(fetchUserPullRequestsSuccess(pullRequestArray));
  } catch (error) {
    yield put(fetchUserPullRequestsFailure({ error }));
  }
}

export function* importPullRequestSaga({ payload }) {
  const { url, issueId } = payload;
  const query = `
    mutation {
      importPullRequest(url: "${url}", issueId:"${issueId}") {
        __typename
        ... on ImportPullRequest {
          apiUrl
          githubUsername
          htmlUrl
          mergeable
          mergeableState
          merged
          open
          pullNumber
          status
          title
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const pullRequestQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { importPullRequest },
    } = yield call(post, '/graphql', pullRequestQuery);
    const { __typename, message } = importPullRequest;
    if (__typename === 'Error') throw message;

    yield put(importPullRequestSuccess({ importPullRequest }));
  } catch (error) {
    yield put(importPullRequestFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(CREATE_PULL_REQUEST, createPullRequestSaga);
  yield takeLatest(DELETE_PULL_REQUEST, deletePullRequestSaga);
  yield takeLatest(FETCH_USER_PULL_REQUESTS, fetchUserPullRequestsSaga);
  yield takeLatest(IMPORT_PULL_REQUEST, importPullRequestSaga);
}

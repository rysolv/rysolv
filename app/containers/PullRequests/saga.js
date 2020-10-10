import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchActiveUser, updateActiveUser } from 'containers/Auth/actions';
import { updateIssueDetail } from 'containers/Issues/actions';
import { fetchCurrentSession } from 'utils/authHelper';
import { post } from 'utils/request';

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
      githubUsername,
      htmlUrl,
      mergeable,
      mergeableState,
      merged,
      open,
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
        })
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
    const token = yield call(fetchCurrentSession);

    const pullRequestQuery = JSON.stringify({
      query,
      variables: { token },
    });
    const {
      data: {
        createPullRequest: { __typename, message },
      },
    } = yield call(post, '/graphql', pullRequestQuery);
    if (__typename === 'Error') throw message;
    yield put(createPullRequestSuccess());
    yield put(fetchActiveUser({ userId }));
    yield put(updateIssueDetail());
  } catch (error) {
    yield put(createPullRequestFailure({ error: { message: error } }));
  }
}

export function* deletePullRequestSaga({ payload }) {
  const { pullRequestId } = payload;
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
    const token = yield call(fetchCurrentSession);

    const pullRequestQuery = JSON.stringify({
      query,
      variables: { token },
    });
    const {
      data: {
        deletePullRequest: { __typename, message },
      },
    } = yield call(post, '/graphql', pullRequestQuery);
    if (__typename === 'Error') throw message;
    yield put(deletePullRequestSuccess({ id: pullRequestId, message }));
    yield put(updateActiveUser({ pullRequestId }));
  } catch (error) {
    yield put(deletePullRequestFailure({ error: { message: error } }));
  }
}

export function* fetchUserPullRequestsSaga() {
  const query = `
    query {
      getUserPullRequests {
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
    const token = yield call(fetchCurrentSession);

    const pullRequestQuery = JSON.stringify({
      query,
      variables: { token },
    });
    const {
      data: {
        getUserPullRequests: { __typename, message, pullRequestArray },
      },
    } = yield call(post, '/graphql', pullRequestQuery);
    if (__typename === 'Error') throw message;
    yield put(fetchUserPullRequestsSuccess({ pullRequestArray }));
  } catch (error) {
    yield put(fetchUserPullRequestsFailure({ error }));
  }
}

export function* importPullRequestSaga({ payload }) {
  const { issueId, url } = payload;
  const query = `
    mutation {
      importPullRequest(issueId:"${issueId}", url: "${url}") {
        __typename
        ... on ImportPullRequest {
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
      data: {
        importPullRequest: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', pullRequestQuery);
    if (__typename === 'Error') throw message;
    yield put(importPullRequestSuccess({ pullRequest: restProps }));
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

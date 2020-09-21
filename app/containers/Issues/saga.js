/* eslint-disable no-underscore-dangle */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  fetchActiveUser,
  updateActiveUser,
  upvoteUserTemp,
  userAttemptingTemp,
  userWatchingTemp,
} from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  addAttemptFailure,
  addAttemptSuccess,
  addCommentFailure,
  addCommentSuccess,
  addWatchFailure,
  addWatchSuccess,
  closeIssueFailure,
  closeIssueSuccess,
  deletePullRequestFailure,
  deletePullRequestSuccess,
  editIssueFailure,
  editIssueSuccess,
  fetchIssueDetail,
  fetchIssueDetailFailure,
  fetchIssueDetailSuccess,
  fetchIssuesFailure,
  fetchIssuesSuccess,
  importIssueFailure,
  importIssueSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchIssuesFailure,
  searchIssuesSuccess,
  upvoteIssueFailure,
  upvoteIssueSuccess,
  upvoteIssueTemp,
} from './actions';
import {
  ADD_ATTEMPT,
  ADD_COMMENT,
  ADD_WATCH,
  CLOSE_ISSUE,
  DELETE_PULL_REQUEST,
  EDIT_ISSUE,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES,
  IMPORT_ISSUE,
  SAVE_INFO,
  SEARCH_ISSUES,
  successEditIssueMessage,
  UPVOTE_ISSUE,
} from './constants';

export function* addAttemptSaga({ payload }) {
  const { issueId, userId } = payload;
  yield put(userAttemptingTemp({ issueId }));
  const query = `
  mutation {
    toggleAttempting(issueId: "${issueId}", userId: "${userId}") {
      __typename
      ... on AttemptingArray {
        issueArray {
          fundedAmount
          id
          name
        },
        userArray
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        toggleAttempting: { __typename, issueArray, message, userArray },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(addAttemptSuccess({ issueId, userArray }));
    yield put(updateActiveUser({ attempting: issueArray }));
  } catch (error) {
    yield put(addAttemptFailure({ error: { message: error }, userId }));
    yield put(userAttemptingTemp({ issueId }));
  }
}

export function* addCommentSaga({ payload }) {
  const { activeUser, body, issueId } = payload;
  const query = `
  mutation{
    createComment(commentInput: {
      body: ${JSON.stringify(body)},
      target: "${issueId}",
      user: "${activeUser.id}"
    }) {
      __typename
      ... on Comment {
        body,
        commentId,
        createdDate,
        profilePic
        target,
        username,
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        createComment: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(addCommentSuccess({ createComment: restProps }));
  } catch (error) {
    yield put(addCommentFailure({ error: { message: error } }));
  }
}

export function* addWatchSaga({ payload }) {
  const { issueId, userId } = payload;
  yield put(userWatchingTemp({ issueId }));
  const query = `
  mutation {
    toggleWatching(issueId: "${issueId}", userId: "${userId}") {
      __typename
      ... on WatchListArray {
        issueArray {
          fundedAmount
          id
          name
        },
        userArray
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        toggleWatching: { __typename, issueArray, message, userArray },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(addWatchSuccess({ issueId, userArray }));
    yield put(updateActiveUser({ watching: issueArray }));
  } catch (error) {
    yield put(addWatchFailure({ error: { message: error }, userId }));
    yield put(userWatchingTemp({ issueId }));
  }
}

export function* closeIssueSaga({ payload }) {
  const { issueId, shouldClose } = payload;
  const query = `
  mutation{
    closeIssue(issueId: "${issueId}", shouldClose: ${shouldClose}) {
      __typename
      ... on Success {
        message
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        closeIssue: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(closeIssueSuccess({ issueId, message }));
  } catch (error) {
    yield put(closeIssueFailure({ error: { message: error } }));
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

export function* editIssueSaga({ payload }) {
  const { editRequest, issueId } = payload;
  const { body, language, name } = editRequest;
  const query = `
    mutation {
      transformIssue(issueId: "${issueId}", issueInput: {
        body: ${JSON.stringify(body)},
        language: ${JSON.stringify(language)},
        name: "${name}",
      }) {
        __typename
        ... on Issue {
          body,
          comments,
          contributor,
          createdDate,
          fundedAmount,
          id,
          language,
          modifiedDate,
          name,
          open,
          organizationId,
          organizationName,
          organizationVerified,
          profilePic,
          rep,
          repo,
          userId,
          username,
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
      data: { transformIssue },
    } = yield call(post, '/graphql', graphql);
    if (transformIssue.__typename === 'Error') {
      throw transformIssue;
    }
    yield put(fetchIssueDetail({ id: issueId }));
    yield put(editIssueSuccess({ message: successEditIssueMessage }));
  } catch (error) {
    yield put(editIssueFailure({ error }));
  }
}

export function* fetchIssueDetailSaga({ payload }) {
  const { id } = payload;
  const query = `
    query {
      oneIssue(id: "${id}") {
        __typename
        ... on Issue {
          attempting
          body
          contributor
          createdDate
          fundedAmount
          id
          language
          modifiedDate
          name
          open
          organizationId
          organizationName
          organizationVerified
          profilePic
          pullRequests
          rep
          repo
          userId
          username
          watching
        }
        ... on Error {
          message
        }
      }
      getIssueComments(issueId: "${id}") {
        body
        createdDate
        profilePic
        userId
        username
      }
    }
  `;
  try {
    // Query Issue Detail
    const issueQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        getIssueComments,
        oneIssue: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', issueQuery);
    if (__typename === 'Error') {
      throw message;
    }

    restProps.comments = getIssueComments;

    yield put(fetchIssueDetailSuccess({ issueDetail: restProps }));
  } catch (error) {
    yield put(fetchIssueDetailFailure({ error: { message: error } }));
  }
}

export function* fetchIssuesSaga() {
  const query = `
  query {
    getIssues {
      __typename
      ... on IssueArray {
        issues {
          attempting
          body
          comments
          createdDate
          fundedAmount
          id
          language
          modifiedDate
          name
          open
          organizationId
          organizationName
          organizationVerified
          rep
          repo
          type
          watching
        }
      }
      ... on Error {
        message
      }
    }
  }
`;
  try {
    const issueQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        getIssues: { __typename, issues, message },
      },
    } = yield call(post, '/graphql', issueQuery);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(fetchIssuesSuccess({ issues }));
  } catch (error) {
    yield put(fetchIssuesFailure({ error }));
  }
}

export function* importIssueSaga({ payload }) {
  const { validatedUrl } = payload;
  const query = `
  mutation{
    importIssue(url: "${validatedUrl}") {
      __typename
      ... on ImportData {
        issueBody
        issueLanguages
        issueName
        issueUrl
        organizationDescription
        organizationId
        organizationLanguages
        organizationLogo
        organizationName
        organizationRepo
        organizationUrl
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        importIssue: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(importIssueSuccess({ importIssue: restProps }));
  } catch (error) {
    yield put(importIssueFailure({ error: { message: error } }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: {
      identiconId,
      isManual,
      issueBody,
      issueLanguages,
      issueName,
      issueUrl,
      organizationDescription,
      organizationId,
      organizationLogo,
      organizationName,
      organizationRepo,
      organizationUrl,
    },
    activeUser: { id: userId },
  } = payload;
  const query = `
    mutation{
      createIssue(
        issueInput: {
          body: ${JSON.stringify(issueBody)},
          contributor: "${userId}",
          identiconId: "${identiconId}",
          isManual: ${isManual},
          language:  ${JSON.stringify(issueLanguages)},
          name: ${JSON.stringify(issueName)},
          organizationDescription:  "${organizationDescription}",
          organizationId:  ${JSON.stringify(organizationId)},
          organizationLogo:  ${JSON.stringify(organizationLogo)},
          organizationName:  "${organizationName}",
          organizationRepo:  "${organizationRepo}",
          organizationUrl:  "${organizationUrl}",
          repo: "${issueUrl}",
        }
      ) {
        __typename
        ... on Issue {
          id
          message
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
      data: {
        createIssue: { __typename, id, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(fetchActiveUser({ userId }));
    yield put(push(`/issues/detail/${id}`));
    yield put(saveInfoSuccess({ message }));
  } catch (error) {
    yield put(push('/issues'));
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchIssuesSaga({ payload }) {
  const { value } = payload;
  const query = `
  query {
    searchIssues(value: "${value}") {
      id,
      createdDate,
      modifiedDate,
      attempting,
      body,
      comments,
      language,
      name,
      organizationId,
      organizationName,
      organizationVerified,
      rep,
      repo,
      fundedAmount,
      watching,
      open,
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { searchIssues },
    } = yield call(post, '/graphql', graphql);

    yield put(searchIssuesSuccess({ issues: searchIssues }));
  } catch (error) {
    yield put(searchIssuesFailure({ error }));
  }
}

export function* upvoteIssuesSaga({ payload }) {
  const { issueId, upvote, userId } = payload;

  // Update front end upvote. Reduce percieved loading time.
  yield put(upvoteIssueTemp({ issueId, upvote }));
  yield put(upvoteUserTemp({ issueId, upvote }));

  const upvoteIssueQuery = `
    mutation {
      upvoteIssue(issueId: "${issueId}", upvote: ${upvote}, userId: "${userId}") {
        __typename
        ... on Upvote {
          issueRep,
          userRep
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const upvoteIssue = JSON.stringify({
      query: upvoteIssueQuery,
      variables: {},
    });
    const {
      data: {
        upvoteIssue: { __typename, issueRep, message, userRep },
      },
    } = yield call(post, '/graphql', upvoteIssue);
    if (__typename === 'Error') throw new Error(message);

    yield put(upvoteIssueSuccess({ issueId, issueRep }));

    if (upvote) {
      yield put(updateActiveUser({ rep: userRep, addUpvote: issueId }));
    } else {
      yield put(updateActiveUser({ rep: userRep, removeUpvote: issueId }));
    }
  } catch (error) {
    yield put(upvoteIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(ADD_ATTEMPT, addAttemptSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
  yield takeLatest(ADD_WATCH, addWatchSaga);
  yield takeLatest(CLOSE_ISSUE, closeIssueSaga);
  yield takeLatest(DELETE_PULL_REQUEST, deletePullRequestSaga);
  yield takeLatest(EDIT_ISSUE, editIssueSaga);
  yield takeLatest(FETCH_ISSUE_DETAIL, fetchIssueDetailSaga);
  yield takeLatest(FETCH_ISSUES, fetchIssuesSaga);
  yield takeLatest(IMPORT_ISSUE, importIssueSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ISSUES, searchIssuesSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssuesSaga);
}

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
  fetchUserIssuesFailure,
  fetchUserIssuesSuccess,
  importIssueFailure,
  importIssueSuccess,
  openIssueModalState,
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
  FETCH_USER_ISSUES,
  IMPORT_ISSUE,
  SAVE_INFO,
  SEARCH_ISSUES,
  UPVOTE_ISSUE,
} from './constants';

export function* addAttemptSaga({ payload }) {
  const { issueId, userId } = payload;
  yield put(userAttemptingTemp({ issueId }));
  const query = `
    mutation {
      toggleAttempting(issueId: "${issueId}") {
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
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        toggleAttempting: { __typename, issueArray, message, userArray },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(addAttemptSuccess({ issueId, userArray }));
    yield put(updateActiveUser({ attempting: issueArray }));
  } catch (error) {
    yield put(addAttemptFailure({ error: { message: error }, userId }));
    yield put(userAttemptingTemp({ issueId }));
  }
}

export function* addCommentSaga({ payload }) {
  const { body, issueId } = payload;
  const query = `
    mutation{
      createComment(commentInput: {
        body: ${JSON.stringify(body)},
        target: "${issueId}",
      }) {
        __typename
        ... on Comment {
          body
          commentId
          createdDate
          profilePic
          target
          username
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        createComment: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
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
      toggleWatching(issueId: "${issueId}") {
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
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        toggleWatching: { __typename, issueArray, message, userArray },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(addWatchSuccess({ issueId, userArray }));
    yield put(updateActiveUser({ watching: issueArray }));
  } catch (error) {
    yield put(addWatchFailure({ error: { message: error }, issueId, userId }));
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
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        closeIssue: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(closeIssueSuccess({ message }));
  } catch (error) {
    yield put(closeIssueFailure({ error: { message: error } }));
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        deletePullRequest: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(deletePullRequestSuccess({ message }));
    yield put(fetchActiveUser());
  } catch (error) {
    yield put(deletePullRequestFailure({ error: { message: error } }));
  }
}

export function* editIssueSaga({ payload }) {
  const { editRequest, issueId } = payload;
  const { body, language, name, type } = editRequest;
  const query = `
    mutation {
      transformIssue(issueId: "${issueId}", issueInput: {
        body: ${JSON.stringify(body)},
        language: ${JSON.stringify(language)},
        name: "${name}",
        type: "${type}"
      }) {
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        transformIssue: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchIssueDetail({ id: issueId }));
    yield put(editIssueSuccess({ message }));
  } catch (error) {
    yield put(editIssueFailure({ error: { message: error } }));
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
          pullRequests
          rep
          repo
          type
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
        githubUrl
        isGithubComment
        profilePic
        userId
        username
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getIssueComments,
        oneIssue: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;

    restProps.comments = getIssueComments;

    yield put(fetchIssueDetailSuccess({ issueDetail: restProps }));
  } catch (error) {
    yield put(fetchIssueDetailFailure({ error }));
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getIssues: { __typename, issues, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchIssuesSuccess({ issues }));
  } catch (error) {
    yield put(fetchIssuesFailure({ error }));
  }
}

export function* fetchUserIssuesSaga() {
  const query = `
    query {
      getUserIssues {
        __typename
        ... on IssueArray {
          issues {
            createdDate
            exists
            name
            organizationName
            repo
          }
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getUserIssues: { __typename, issues, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserIssuesSuccess({ issues }));
  } catch (error) {
    yield put(fetchUserIssuesFailure());
  }
}

export function* importIssueSaga({ payload }) {
  const { validatedUrl } = payload;
  const query = `
    mutation{
      importIssue(url: "${validatedUrl}") {
        __typename
        ... on ImportData {
          githubCommentCount
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
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        importIssue: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(importIssueSuccess({ importIssue: restProps }));
  } catch (error) {
    yield put(importIssueFailure({ error: { message: error } }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: {
      githubCommentCount,
      identiconId,
      isManual,
      issueBody,
      issueLanguages,
      issueName,
      issueType,
      issueUrl,
      organizationDescription,
      organizationId,
      organizationLogo,
      organizationName,
      organizationRepo,
      organizationUrl,
    },
  } = payload;
  const query = `
    mutation{
      createIssue(
        issueInput: {
          body: ${JSON.stringify(issueBody)},
          githubCommentCount: ${githubCommentCount},
          identiconId: "${identiconId}",
          isManual: ${isManual},
          language: ${JSON.stringify(issueLanguages)},
          name: ${JSON.stringify(issueName)},
          organizationDescription: ${JSON.stringify(organizationDescription)},
          organizationId: ${JSON.stringify(organizationId)},
          organizationLogo: ${JSON.stringify(organizationLogo)},
          organizationName: ${JSON.stringify(organizationName)},
          organizationRepo: "${organizationRepo}",
          organizationUrl: "${organizationUrl}",
          repo: "${issueUrl}",
          type: "${issueType}",
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        createIssue: { __typename, id, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchActiveUser());
    yield put(push(`/issues/detail/${id}`));
    yield put(openIssueModalState({ modalState: 'embedIssue' }));
    yield put(saveInfoSuccess({ message }));
  } catch (error) {
    yield put(push('/issues'));
    yield put(saveInfoFailure({ error: { message: error } }));
  }
}

export function* searchIssuesSaga({ payload }) {
  const { value } = payload;
  const query = `
    query {
      searchIssues(value: "${value}") {
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
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: { searchIssues },
    } = yield call(post, '/graphql', graphql);
    yield put(searchIssuesSuccess({ issues: searchIssues }));
  } catch (error) {
    yield put(searchIssuesFailure());
  }
}

export function* upvoteIssuesSaga({ payload }) {
  const { issueId, upvote } = payload;

  // Update front end upvote. Reduce percieved loading time.
  yield put(upvoteIssueTemp({ issueId, upvote }));
  yield put(upvoteUserTemp({ issueId, upvote }));

  const query = `
    mutation {
      upvoteIssue(issueId: "${issueId}", upvote: ${upvote}) {
        __typename
        ... on Upvote {
          issueRep
          userRep
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        upvoteIssue: { __typename, issueRep, message, userRep },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(upvoteIssueSuccess({ issueId, issueRep }));
    if (upvote) {
      yield put(updateActiveUser({ rep: userRep, addUpvote: issueId }));
    } else {
      yield put(updateActiveUser({ rep: userRep, removeUpvote: issueId }));
    }
  } catch (error) {
    yield put(upvoteIssueFailure({ error: { message: error } }));
    yield put(upvoteIssueTemp({ issueId, upvote: !upvote }));
    yield put(upvoteUserTemp({ issueId, upvote: !upvote }));
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
  yield takeLatest(FETCH_USER_ISSUES, fetchUserIssuesSaga);
  yield takeLatest(IMPORT_ISSUE, importIssueSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ISSUES, searchIssuesSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssuesSaga);
}

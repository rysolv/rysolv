import { call, put, takeLatest, all } from 'redux-saga/effects';

import { fetchActiveUser } from 'containers/Admin/actions';
import { post } from 'utils/request';

import {
  ADD_ATTEMPT,
  ADD_COMMENT,
  DELETE_ISSUE,
  FETCH_ISSUE_DETAIL,
  FETCH_ISSUES,
  SAVE_INFO,
  SEARCH_ISSUES,
  successCreateIssueMessage,
  UPVOTE_ISSUE,
} from './constants';
import {
  addAttemptFailure,
  addAttemptSuccess,
  addCommentFailure,
  addCommentSuccess,
  deleteIssueFailure,
  deleteIssueSuccess,
  fetchIssueDetailFailure,
  fetchIssueDetailSuccess,
  fetchIssuesFailure,
  fetchIssuesSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchIssuesFailure,
  searchIssuesSuccess,
  upvoteIssueFailure,
  upvoteIssueSuccess,
} from './actions';

export function* addAttemptSaga({ payload }) {
  const { id: issueId, userId, column, remove } = payload;
  const query = `
  mutation {
    updateIssueArray(id: "${issueId}", column: "${column}", data: "${userId}", remove: ${remove}) {
      ${column}
    }
    updateUserArray(id: "${userId}", column: "${column}", data: "${issueId}", remove: ${remove}) {
      ${column}
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { updateIssueArray },
    } = yield call(post, '/graphql', graphql);
    yield put(addAttemptSuccess(updateIssueArray));
    yield put(fetchActiveUser({ userId }));
  } catch (error) {
    yield put(addAttemptFailure({ error }));
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
      body,
      commentId,
      createdDate,
      profilePic
      target,
      username,
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const { data: createComment } = yield call(post, '/graphql', graphql);
    yield put(addCommentSuccess(createComment));
  } catch (error) {
    yield put(addCommentFailure({ error }));
  }
}

export function* deleteIssueSaga({ payload }) {
  const { itemId } = payload;
  const query = `
  mutation{
    deleteIssue(id: "${itemId}")
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { deleteIssue },
    } = yield call(post, '/graphql', graphql);
    yield put(deleteIssueSuccess({ itemId, message: deleteIssue }));
  } catch (error) {
    yield put(deleteIssueFailure({ error }));
  }
}

const generateOrganizationQuery = id => {
  const orgQuery = `
  query {
    oneOrganization(id: "${id}") {
      __typename
      ... on Organization {
        verified
        name
      }
      ... on Error {
        message
      }
    }
  }
 `;
  return [
    JSON.stringify({
      query: orgQuery,
      variables: {},
    }),
  ];
};

export function* fetchIssueDetailSaga({ payload }) {
  const { id } = payload;
  const query = `
    query {
      oneIssue(id: "${id}") {
        __typename
        ... on Issue {
          id,
          createdDate,
          modifiedDate,
          attempts,
          body,
          comments,
          attempting,
          contributor,
          language,
          name,
          organizationId,
          rep,
          repo,
          value,
          watching,
          open,
        }
        ... on Error {
          message
        }
      }
      getIssueComments(id: "${id}") {
        body
        userId
        username
        createdDate
        profilePic
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
      data: { oneIssue, getIssueComments },
    } = yield call(post, '/graphql', issueQuery);

    oneIssue.comments = getIssueComments;

    // Query Users
    const userQuery = `
      query {
        oneUser(column: "id", query: "${oneIssue.contributor[0]}") {
          id,
          username,
          profilePic,
        }
      }
    `;
    const userGraphql = JSON.stringify({
      query: userQuery,
      variables: {},
    });
    const {
      data: {
        oneUser: { username, profilePic },
      },
    } = yield call(post, '/graphql', userGraphql);

    // Add data to IssueDetail
    oneIssue.user = {
      username,
      profilePic,
    };
    yield put(fetchIssueDetailSuccess({ oneIssue }));
  } catch (error) {
    yield put(fetchIssueDetailFailure({ error }));
  }
}

export function* fetchIssuesSaga() {
  const issues = `
  query {
    getIssues {
      id,
      createdDate,
      modifiedDate,
      attempting,
      body,
      comments,
      language,
      name,
      organizationId,
      rep,
      repo,
      value,
      watching,
      open,
    }
  }
`;
  try {
    const issueQuery = JSON.stringify({
      query: issues,
      variables: {},
    });
    const {
      data: { getIssues },
    } = yield call(post, '/graphql', issueQuery);

    const organizationQuery = getIssues.map(issue =>
      generateOrganizationQuery(issue.organizationId),
    );
    const results = yield all(
      organizationQuery.map(organizationId =>
        call(post, '/graphql', organizationId),
      ),
    );
    const formattedGetIssues = results.reduce(
      (acc, { data: { oneOrganization } }, index) => {
        const { name, verified } = oneOrganization || {};

        acc[index].organizationVerified = verified || false;
        acc[index].organizationName = name || '[No Organization]';

        return acc;
      },
      getIssues,
    );
    yield put(fetchIssuesSuccess(formattedGetIssues));
  } catch (error) {
    yield put(fetchIssuesFailure({ error }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: { name, value, body, repo, language },
  } = payload;
  const query = `
  mutation{
    createIssue(
      issueInput: {
        body: ${JSON.stringify(body)},
        language: "${language}",
        name: "${name}",
        repo: "${repo}",
        value: ${value},
      }
    )
    { id }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(saveInfoSuccess({ message: successCreateIssueMessage }));
  } catch (error) {
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
      rep,
      repo,
      value,
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
    const organizationQuery = searchIssues.map(issue =>
      generateOrganizationQuery(issue.organizationId),
    );
    const results = yield all(
      organizationQuery.map(organizationId =>
        call(post, '/graphql', organizationId),
      ),
    );
    const formattedsearchIssues = results.reduce(
      (acc, { data: { oneOrganization } }, index) => {
        const { name, verified } = oneOrganization || {};

        acc[index].organizationVerified = verified || false;
        acc[index].organizationName = name || '[No Organization]';

        return acc;
      },
      searchIssues,
    );
    yield put(searchIssuesSuccess({ issues: formattedsearchIssues }));
  } catch (error) {
    yield put(searchIssuesFailure({ error }));
  }
}

export function* upvoteIssuesSaga({ payload }) {
  const { itemId } = payload;
  const upvoteIssueQuery = `
      mutation {
        upvoteIssue(id: "${itemId}" }) {
          id,
          rep
        }
      }
    `;
  try {
    const upvoteIssue = JSON.stringify({
      query: upvoteIssueQuery,
      variables: {},
    });
    const {
      data: { transformIssue },
    } = yield call(post, '/graphql', upvoteIssue);
    yield put(upvoteIssueSuccess(transformIssue));
  } catch (error) {
    yield put(upvoteIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(ADD_ATTEMPT, addAttemptSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
  yield takeLatest(DELETE_ISSUE, deleteIssueSaga);
  yield takeLatest(FETCH_ISSUE_DETAIL, fetchIssueDetailSaga);
  yield takeLatest(FETCH_ISSUES, fetchIssuesSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ISSUES, searchIssuesSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssuesSaga);
}

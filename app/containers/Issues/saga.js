import { call, put, takeLatest, all } from 'redux-saga/effects';
import { post } from 'utils/request';
import {
  DELETE_ISSUE,
  FETCH_ISSUES,
  SEARCH_ISSUES,
  UPVOTE_ISSUE,
} from './constants';
import {
  deleteIssueFailure,
  deleteIssueSuccess,
  fetchIssuesFailure,
  fetchIssuesSuccess,
  searchIssuesFailure,
  searchIssuesSuccess,
  upvoteIssueSuccess,
  upvoteIssueFailure,
} from './actions';

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

export function* fetchIssuesSaga() {
  const issues = `
  query {
    getIssues {
      id,
      createdDate,
      modifiedDate,
      name,
      repo,
      organizationId,
      language,
      body,
      attempts,
      rep,
      watchList,
      comments,
      value
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
        acc[index].organizationName = name || '[Organization deleted]';

        return acc;
      },
      getIssues,
    );
    yield put(fetchIssuesSuccess(formattedGetIssues));
  } catch (error) {
    yield put(fetchIssuesFailure({ error }));
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
      name,
      repo,
      organizationId,
      language,
      body,
      attempts,
      rep,
      watchList,
      comments,
      value
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
        acc[index].organizationName = name || '[Organization deleted]';

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

  const getIssueQuery = `
  query {
    oneIssue(id: "${itemId}") {
      __typename
      ... on Issue {
        rep
      }
      ... on Error {
        message
      }
    }
  }
  `;

  try {
    const getIssue = JSON.stringify({
      query: getIssueQuery,
      variables: {},
    });
    const {
      data: {
        oneIssue: { rep },
      },
    } = yield call(post, '/graphql', getIssue);

    const updateIssueQuery = `
      mutation {
        transformIssue(id: "${itemId}", issueInput:{rep:${rep + 1} }) {
          rep
        }
      }
    `;

    const updateIssue = JSON.stringify({
      query: updateIssueQuery,
      variables: {},
    });
    console.log(updateIssue);

    const data = yield call(post, '/graphql', updateIssue);
    console.log(data);

    yield put(upvoteIssueSuccess({ rep }));
  } catch (error) {
    yield put(upvoteIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_ISSUE, deleteIssueSaga);
  yield takeLatest(FETCH_ISSUES, fetchIssuesSaga);
  yield takeLatest(SEARCH_ISSUES, searchIssuesSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssuesSaga);
}

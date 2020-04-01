import { call, put, takeLatest, all } from 'redux-saga/effects';
import { post } from 'utils/request';
import { DELETE_ISSUE, FETCH_ISSUES } from './constants';
import {
  deleteIssueFailure,
  deleteIssueSuccess,
  fetchIssuesFailure,
  fetchIssuesSuccess,
} from './actions';

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
  const generateQuery = id => {
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

  try {
    const issueQuery = JSON.stringify({
      query: issues,
      variables: {},
    });
    const {
      data: { getIssues },
    } = yield call(post, '/graphql', issueQuery);

    const organizationQuery = getIssues.map(issue =>
      generateQuery(issue.organizationId),
    );

    const results = yield all(
      organizationQuery.map(organizationId =>
        call(post, '/graphql', organizationId),
      ),
    );

    const formattedGetIssues = results.reduce(
      (
        acc,
        {
          data: {
            oneOrganization: { verified, name },
          },
        },
        index,
      ) => {
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

export default function* watcherSaga() {
  yield takeLatest(DELETE_ISSUE, deleteIssueSaga);
  yield takeLatest(FETCH_ISSUES, fetchIssuesSaga);
}

import { call, put, takeLatest, all } from 'redux-saga/effects';
import { del, post } from 'utils/request';
import { DELETE_ISSUE, FETCH_ISSUES } from './constants';
import {
  deleteIssueFailure,
  deleteIssueSuccess,
  fetchIssuesFailure,
  fetchIssuesSuccess,
} from './actions';

export function* deleteIssueSaga({ payload }) {
  const { issueId } = payload;
  try {
    const endpoint = `/api/companies/${issueId}`;
    const { message } = yield call(del, endpoint);
    yield put(deleteIssueSuccess({ message }));
  } catch (error) {
    yield put(deleteIssueFailure({ error }));
  }
}

export function* fetchIssuesSaga() {
  const issues = `
  query {
    getIssues {
      id,
      created_date,
      modified_date,
      name,
      repo,
      organization,
      organization_id,
      language,
      body,
      attempts,
      rep,
      watch_list,
      comments,
      value
    }
  }
`;
  const generateQuery = id => {
    const orgQuery = `
    query {
      oneOrganization(id: "${id}") {
        verified
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
      generateQuery(issue.organization_id),
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
            oneOrganization: { verified },
          },
        },
        index,
      ) => {
        acc[index].organizationVerified = verified;
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

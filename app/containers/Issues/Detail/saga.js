import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from 'utils/request';
import { FETCH_ISSUE_DETAIL } from './constants';
import { fetchIssueDetailFailure, fetchIssueDetailSuccess } from './actions';

export function* fetchIssueDetailSaga({ payload }) {
  const { id } = payload;
  const query = `
  query {
    oneIssue(id: "${id}") {
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
      query,
      variables: {},
    });
    const { data: oneIssue } = yield call(post, '/graphql', issueQuery);
    yield put(fetchIssueDetailSuccess(oneIssue));
  } catch (error) {
    yield put(fetchIssueDetailFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ISSUE_DETAIL, fetchIssueDetailSaga);
}

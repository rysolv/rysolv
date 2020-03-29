import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from 'utils/request';
import { FETCH_ISSUE_DETAIL } from './constants';
import { fetchIssueDetailFailure, fetchIssueDetailSuccess } from './actions';

export function* fetchIssueDetailSaga({ payload }) {
  const {
    id: { view },
  } = payload;
  const query = `
  query {
    oneIssue(id: "${view}") {
      id,
      created_date,
      modified_date,
      name,
      repo,
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

  try {
    const issueQuery = JSON.stringify({
      query,
      variables: {},
    });
    const { data: oneIssue } = yield call(post, '/graphql', issueQuery);
    console.log(oneIssue);

    // const { issueDetail } = yield call(get, `/api/issues/${id}`);
    // console.log(issueDetail);
    yield put(fetchIssueDetailSuccess(oneIssue));
  } catch (error) {
    yield put(fetchIssueDetailFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ISSUE_DETAIL, fetchIssueDetailSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'utils/request';
import { FETCH_ISSUE_DETAIL } from './constants';
import { fetchIssueDetailFailure, fetchIssueDetailSuccess } from './actions';

export function* fetchIssueDetailSaga({ payload }) {
  const { id } = payload;
  console.log(id);
  try {
    const { issueDetail } = yield call(get, `/api/issues/${id}`);
    console.log(issueDetail);
    yield put(fetchIssueDetailSuccess({ issueDetail }));
  } catch (error) {
    yield put(fetchIssueDetailFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ISSUE_DETAIL, fetchIssueDetailSaga);
}

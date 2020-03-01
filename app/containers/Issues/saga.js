import { call, put, takeLatest } from 'redux-saga/effects';
import { del, get } from 'utils/request';
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
  try {
    const { issues } = yield call(get, `/api/issues`);
    console.log(issues);
    yield put(fetchIssuesSuccess({ issues }));
  } catch (error) {
    yield put(fetchIssuesFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_ISSUE, deleteIssueSaga);
  yield takeLatest(FETCH_ISSUES, fetchIssuesSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'utils/request';
import { FETCH_COMPANIES } from './constants';
import { fetchCompaniesFailure, fetchCompaniesSuccess } from './actions';

export function* fetchCompaniesSaga() {
  try {
    const { companies } = yield call(get, `/api/companies`);
    yield put(fetchCompaniesSuccess({ companies }));
  } catch (error) {
    yield put(fetchCompaniesFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_COMPANIES, fetchCompaniesSaga);
}

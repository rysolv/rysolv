import { call, put, takeLatest } from 'redux-saga/effects';
import { del, get, post } from 'utils/request';
import { DELETE_COMPANY, FETCH_COMPANIES, SAVE_INFO } from './constants';
import {
  deleteCompanyFailure,
  deleteCompanySuccess,
  fetchCompaniesFailure,
  fetchCompaniesSuccess,
  saveInfoFailure,
  saveInfoSuccess,
} from './actions';

export function* deleteCompanySaga({ payload }) {
  const { companyId } = payload;
  try {
    const endpoint = `/api/companies/${companyId}`;
    const { message } = yield call(del, endpoint);
    yield put(deleteCompanySuccess({ message }));
  } catch (error) {
    yield put(deleteCompanyFailure({ error }));
  }
}

export function* fetchCompaniesSaga() {
  try {
    const { companies } = yield call(get, `/api/companies`);
    yield put(fetchCompaniesSuccess({ companies }));
  } catch (error) {
    yield put(fetchCompaniesFailure({ error }));
  }
}

export function* saveInfoSaga() {
  try {
    const { message } = yield call(post, `/api/companies`);
    console.log('1message', message);
    yield put(saveInfoSuccess({ message }));
  } catch (error) {
    yield put(saveInfoFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_COMPANY, deleteCompanySaga);
  yield takeLatest(FETCH_COMPANIES, fetchCompaniesSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
}

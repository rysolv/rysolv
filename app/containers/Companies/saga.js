import { call, put, takeLatest } from 'redux-saga/effects';
import { del, get, post } from 'utils/request';
import {
  DELETE_COMPANY,
  FETCH_COMPANIES,
  FETCH_INFO,
  SAVE_INFO,
  SEARCH_COMPANIES,
  UPDATE_INFO,
} from './constants';
import {
  deleteCompanyFailure,
  deleteCompanySuccess,
  fetchCompaniesFailure,
  fetchCompaniesSuccess,
  fetchInfoFailure,
  fetchInfoSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchCompaniesFailure,
  searchCompaniesSuccess,
  updateInfoFailure,
  updateInfoSuccess,
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
  const query = `
  query {
    getOrganizations {
      id,
      createdDate,
      modifiedDate,
      name,
      description,
      repoUrl,
      website,
      issues,
      logo,
      verified
    }
  }
`;

  try {
    const organizationsQuery = JSON.stringify({
      query,
      variables: {},
    });
    const { data: getOrganizations } = yield call(
      post,
      '/graphql',
      organizationsQuery,
    );
    console.log(getOrganizations);

    yield put(fetchCompaniesSuccess(getOrganizations));
  } catch (error) {
    yield put(fetchCompaniesFailure({ error }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { companyId } = payload;
  try {
    const { company } = yield call(get, `/api/companies/${companyId}`);
    yield put(fetchInfoSuccess({ company }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* saveInfoSaga() {
  try {
    const { message } = yield call(post, `/api/companies`);
    yield put(saveInfoSuccess({ message }));
  } catch (error) {
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchCompaniesSaga({ payload }) {
  const { name } = payload;
  try {
    const { companies } = yield call(
      get,
      `/api/companies/search?company=${name}`,
    );
    yield put(searchCompaniesSuccess({ companies }));
  } catch (error) {
    yield put(searchCompaniesFailure({ error }));
  }
}

export function* updateInfoSaga({ payload }) {
  const { companyId, companyInfo } = payload;
  try {
    const { message } = yield call(
      post,
      `/api/companies/${companyId}`,
      companyInfo,
    );
    yield put(updateInfoSuccess({ message }));
  } catch (error) {
    yield put(updateInfoFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_COMPANY, deleteCompanySaga);
  yield takeLatest(FETCH_COMPANIES, fetchCompaniesSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_COMPANIES, searchCompaniesSaga);
  yield takeLatest(UPDATE_INFO, updateInfoSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  DELETE_COMPANY,
  FETCH_COMPANIES,
  FETCH_INFO,
  SAVE_INFO,
  SEARCH_COMPANIES,
  successCreateOrganizationMessage,
  successEditOrganizationMessage,
  UPDATE_INFO,
} from './constants';
import {
  deleteCompanyFailure,
  deleteCompanySuccess,
  fetchCompanies,
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
  const { itemId } = payload;
  try {
    const query = `
    mutation{
      deleteOrganization(id: "${itemId}")
    }`;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { deleteOrganization },
    } = yield call(post, '/graphql', graphql);
    yield put(deleteCompanySuccess({ itemId, message: deleteOrganization }));
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
      companyUrl,
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
    yield put(fetchCompaniesSuccess(getOrganizations));
  } catch (error) {
    yield put(fetchCompaniesFailure({ error }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { itemId } = payload;
  const query = `
  query {
    oneOrganization(id: "${itemId}") {
      __typename
      ... on Organization {
        id,
        createdDate,
        modifiedDate,
        name,
        description,
        repoUrl,
        companyUrl,
        issues,
        logo,
        verified,
        contributors,
        ownerId
      }
      ... on Error {
        message
      }
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneOrganization },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchInfoSuccess({ company: oneOrganization }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: { companyUrl, description, logo, name, repoUrl, verified },
  } = payload;
  const query = `
  mutation{
    createOrganization(organizationInput: {
      name: "${name}",
      description: "${description}",
      repoUrl: "${repoUrl}",
      companyUrl: "${companyUrl}",
      logo: "${logo}",
      verified: ${verified},
    })
    { id }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(fetchCompanies());
    yield put(saveInfoSuccess({ message: successCreateOrganizationMessage }));
  } catch (error) {
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchCompaniesSaga({ payload }) {
  const { value } = payload;
  const query = `
  query {
    searchOrganizations(value: "${value}") {
      id,
      createdDate,
      modifiedDate,
      name,
      description,
      repoUrl,
      companyUrl,
      issues,
      logo,
      verified,
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { searchOrganizations },
    } = yield call(post, '/graphql', graphql);
    yield put(searchCompaniesSuccess({ organizations: searchOrganizations }));
  } catch (error) {
    yield put(searchCompaniesFailure({ error }));
  }
}

export function* updateInfoSaga({ payload }) {
  const { editRequest, itemId } = payload;
  const {
    companyUrl,
    description,
    logo,
    name,
    repoUrl,
    verified,
  } = editRequest;
  const query = `
    mutation {
      transformOrganization(id: "${itemId}", organizationInput: {
        name: "${name}",
        description: "${description}",
        repoUrl: "${repoUrl}",
        companyUrl: "${companyUrl}",
        logo: "${logo}",
        verified: ${verified},
      }) {
        id,
        createdDate,
        modifiedDate,
        name,
        description,
        repoUrl,
        companyUrl,
        issues,
        logo,
        verified,
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(fetchCompanies());
    yield put(updateInfoSuccess({ message: successEditOrganizationMessage }));
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

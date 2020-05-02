import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  DELETE_ORGANIZATION,
  FETCH_ORGANIZATIONS,
  FETCH_INFO,
  SAVE_INFO,
  SEARCH_ORGANIZATIONS,
  successCreateOrganizationMessage,
  successEditOrganizationMessage,
  UPDATE_INFO,
} from './constants';
import {
  deleteOrganizationFailure,
  deleteOrganizationSuccess,
  fetchOrganizations,
  fetchOrganizationsFailure,
  fetchOrganizationsSuccess,
  fetchInfoFailure,
  fetchInfoSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchOrganizationsFailure,
  searchOrganizationsSuccess,
  updateInfoFailure,
  updateInfoSuccess,
} from './actions';

export function* deleteOrganizationSaga({ payload }) {
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
    yield put(
      deleteOrganizationSuccess({ itemId, message: deleteOrganization }),
    );
  } catch (error) {
    yield put(deleteOrganizationFailure({ error }));
  }
}

export function* fetchOrganizationsSaga() {
  const query = `
  query {
    getOrganizations {
      id,
      createdDate,
      modifiedDate,
      name,
      description,
      repoUrl,
      organizationUrl,
      issues,
      logo,
      verified,
      totalFunded
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
    yield put(fetchOrganizationsSuccess(getOrganizations));
  } catch (error) {
    yield put(fetchOrganizationsFailure({ error }));
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
        organizationUrl,
        issues,
        logo,
        verified,
        contributors,
        ownerId,
        totalFunded,
        preferredLanguages
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
    yield put(fetchInfoSuccess({ organization: oneOrganization }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: { organizationUrl, description, logo, name, repoUrl },
  } = payload;
  const query = `
  mutation{
    createOrganization(organizationInput: {
      name: "${name}",
      description: "${description}",
      repoUrl: "${repoUrl}",
      organizationUrl: "${organizationUrl}",
      logo: "${logo}",
    })
    { id }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(fetchOrganizations());
    yield put(saveInfoSuccess({ message: successCreateOrganizationMessage }));
  } catch (error) {
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchOrganizationsSaga({ payload }) {
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
      organizationUrl,
      issues,
      logo,
      verified,
      totalFunded,
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
    yield put(
      searchOrganizationsSuccess({ organizations: searchOrganizations }),
    );
  } catch (error) {
    yield put(searchOrganizationsFailure({ error }));
  }
}

export function* updateInfoSaga({ payload }) {
  const { editRequest, itemId } = payload;
  const {
    organizationUrl,
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
        organizationUrl: "${organizationUrl}",
        logo: "${logo}",
        verified: ${verified},
      }) {
        id,
        createdDate,
        modifiedDate,
        name,
        description,
        repoUrl,
        organizationUrl,
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
    yield put(fetchOrganizations());
    yield put(updateInfoSuccess({ message: successEditOrganizationMessage }));
  } catch (error) {
    yield put(updateInfoFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_ORGANIZATION, deleteOrganizationSaga);
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrganizationsSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga);
  yield takeLatest(UPDATE_INFO, updateInfoSaga);
}

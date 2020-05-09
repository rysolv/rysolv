import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchOrganizationOptionsFailure,
  fetchOrganizationOptionsSuccess,
} from './actions';
import { FETCH_ORGANIZATION_OPTIONS } from './constants';

export function* fetchOrganizationOptionsSaga() {
  const query = `
    query {
      getOrganizations {
        name,
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
    yield put(fetchOrganizationOptionsSuccess(getOrganizations));
  } catch (error) {
    yield put(fetchOrganizationOptionsFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ORGANIZATION_OPTIONS, fetchOrganizationOptionsSaga);
}

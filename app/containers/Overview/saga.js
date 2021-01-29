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
      getFilter {
        __typename
        ... on Filter {
          languageArray
          unfundedIssues
          closedIssues
          organizations
          fundedIssues
          maxBounty
          featureTag
          bugTag
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: { getFilter },
    } = yield call(post, '/graphql', graphql);
    console.log(getFilter);
    yield put(
      fetchOrganizationOptionsSuccess({
        organizations: getFilter.organizations,
      }),
    );
  } catch (error) {
    yield put(fetchOrganizationOptionsFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ORGANIZATION_OPTIONS, fetchOrganizationOptionsSaga);
}

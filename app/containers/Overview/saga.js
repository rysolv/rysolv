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
          bugTag
          closedIssues
          featureTag
          fundedIssues
          languageArray
          maxBounty
          organizations
          unfundedIssues
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
      data: { getFilter: filterCriteria },
    } = yield call(post, '/graphql', graphql);

    const organizations = filterCriteria.organizations.map(el => ({
      name: el,
    }));

    yield put(
      fetchOrganizationOptionsSuccess({
        organizations,
      }),
    );
  } catch (error) {
    yield put(fetchOrganizationOptionsFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ORGANIZATION_OPTIONS, fetchOrganizationOptionsSaga);
}

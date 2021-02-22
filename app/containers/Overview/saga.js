import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchFilterOptionsFailure,
  fetchFilterOptionsSuccess,
} from './actions';
import { FETCH_FILTER_OPTIONS } from './constants';

export function* fetchFilterOptionsSaga() {
  const query = `
    query {
      getFilterOptions {
        __typename
        ... on Filter {
          bugTag
          closedIssues
          featureTag
          fundedIssues
          issueLanguages
          maxBounty
          repos
          unfundedIssues
          userLanguages
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
      data: { getFilterOptions: filterOptions },
    } = yield call(post, '/graphql', graphql);
    yield put(
      fetchFilterOptionsSuccess({
        filterOptions,
      }),
    );
  } catch (error) {
    yield put(fetchFilterOptionsFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_FILTER_OPTIONS, fetchFilterOptionsSaga);
}

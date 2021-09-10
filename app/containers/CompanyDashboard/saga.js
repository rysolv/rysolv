import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchCompanyMatchesFailure,
  fetchCompanyMatchesSuccess,
} from './actions';
import { FETCH_COMPANY_MATCHES } from './constants';

export function* fetchCompanyMatchesSaga() {
  const query = `
    query {
      getCompanyMatches {
        __typename
        ... on CompanyMatchesArray {
          companyMatchesArray {
            candidates
            position
          }
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getCompanyMatches: { companyMatchesArray },
      },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchCompanyMatchesSuccess({ companyMatchesArray }));
  } catch (error) {
    yield put(fetchCompanyMatchesFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_COMPANY_MATCHES, fetchCompanyMatchesSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';

import { get } from 'utils/request';

import {
  fetchCompanyMatchesFailure,
  fetchCompanyMatchesSuccess,
} from './actions';
import { FETCH_COMPANY_MATCHES } from './constants';

export function* fetchCompanyMatchesSaga({ payload }) {
  const { id } = payload;
  const query = `
    query {
      oneIssue(id: "${id}") {
        __typename
        ... on Issue {
          attempting
          awardedUser
          body
          contributor
          createdDate
          fundedAmount
          id
          isPullRequestMerged
          isUserAccepted
          language
          modifiedDate
          name
          open
          pullRequests
          rep
          repo
          repoId
          repoName
          repoVerified
          type
          userId
          username
          watching
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
      data: {
        fetchCompanyMatches: { __typename, companyMatches, message },
      },
    } = yield call(get, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchCompanyMatchesSuccess({ companyMatches }));
  } catch (error) {
    yield put(fetchCompanyMatchesFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_COMPANY_MATCHES, fetchCompanyMatchesSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchCompanyMatchesFailure,
  fetchCompanyMatchesSuccess,
  notifyCandidateFailure,
  notifyCandidateSuccess,
  resetModalState,
} from './actions';
import { FETCH_COMPANY_MATCHES, NOTIFY_CANDIDATE } from './constants';

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

export function* notifyCandidateSaga({ payload }) {
  const { body, positionId, userId } = payload;
  const query = `
    mutation{
      createMessage(messageInput: {
        body: ${JSON.stringify(body)},
        positionId: "${positionId}",
        userId: "${userId}",
      }) {
        __typename
        ... on Success {
          message
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
        createMessage: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(notifyCandidateSuccess({ message }));
    yield put(resetModalState());
  } catch (error) {
    yield put(notifyCandidateFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_COMPANY_MATCHES, fetchCompanyMatchesSaga);
  yield takeLatest(NOTIFY_CANDIDATE, notifyCandidateSaga);
}

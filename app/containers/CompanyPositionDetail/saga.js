import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchCompany,
  fetchCompanyFailure,
  fetchCompanySuccess,
  fetchPositionDetailFailure,
  fetchPositionDetailSuccess,
} from './actions';
import { FETCH_COMPANY, FETCH_POSITION_DETAIL } from './constants';

export function* fetchCompanySaga({ payload }) {
  const { companyId } = payload;
  const query = `
    query {
      oneCompany(companyId: "${companyId}") {
        __typename
        ... on Company {
          description
          location
          logo
          name
          size
          website
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
        oneCompany: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchCompanySuccess({ company: restProps }));
  } catch (error) {
    yield put(fetchCompanyFailure());
  }
}

export function* fetchPositionDetailSaga({ payload }) {
  const { positionId } = payload;
  const query = `
    query {
      onePosition(positionId: "${positionId}") {
        __typename
        ... on Position {
          companyId
          description
          experience
          id
          isActive
          location
          role
          salary
          skills
          timezone
          title
          type
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
        onePosition: { __typename, companyId, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchPositionDetailSuccess({ position: restProps }));
    yield put(fetchCompany({ companyId }));
  } catch (error) {
    yield put(fetchPositionDetailFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_COMPANY, fetchCompanySaga);
  yield takeLatest(FETCH_POSITION_DETAIL, fetchPositionDetailSaga);
}

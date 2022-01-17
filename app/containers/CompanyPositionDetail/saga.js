import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchPositionDetailFailure,
  fetchPositionDetailSuccess,
} from './actions';
import { FETCH_POSITION_DETAIL } from './constants';

export function* fetchPositionDetailSaga({ payload }) {
  const { positionId } = payload;
  const query = `
    query {
      onePosition(positionId: "${positionId}") {
        __typename
        ... on Position {
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
        onePosition: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchPositionDetailSuccess({ position: restProps }));
  } catch (error) {
    yield put(fetchPositionDetailFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_POSITION_DETAIL, fetchPositionDetailSaga);
}

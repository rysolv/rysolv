import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchDashboardStatsFailure,
  fetchDashboardStatsSuccess,
} from './actions';
import { FETCH_DASHBOARD_STATS } from './constants';

export function* fetchDashboardStatsSaga() {
  const query = `
      query {
        getStats {
          __typename
          ...on Stats {
            mostContribution
            mostEarned
            mostRep
            totalAvailable
            totalEarned
            totalFunded
            totalResolved
          }
          ...on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getStats: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchDashboardStatsSuccess({ stats: restProps }));
  } catch (error) {
    yield put(fetchDashboardStatsFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_DASHBOARD_STATS, fetchDashboardStatsSaga);
}

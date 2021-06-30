import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchHomePageStatsFailure,
  fetchHomePageStatsSuccess,
  sendContactFailure,
  sendContactSuccess,
} from './actions';
import { FETCH_HOME_PAGE_STATS, SEND_CONTACT } from './constants';

export function* fetchHomePageStatsSaga() {
  const query = `
    query {
      getStats {
        __typename
        ...on Stats {
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
    yield put(fetchHomePageStatsSuccess({ stats: restProps }));
  } catch (error) {
    yield put(fetchHomePageStatsFailure());
  }
}

export function* sendContactSaga(payload) {
  const { body, email } = payload;
  const query = `
    mutation {
      sendContact(contactInput: {body: ${body}, email: ${email}, source: "landing"}) {
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
        sendContact: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield delay(1000);
    yield put(sendContactSuccess());
  } catch (error) {
    yield delay(1000);
    yield put(sendContactFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_HOME_PAGE_STATS, fetchHomePageStatsSaga);
  yield takeLatest(SEND_CONTACT, sendContactSaga);
}

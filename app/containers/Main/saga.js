import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchWatchListFailure,
  fetchWatchListSuccess,
  openModalState,
} from './actions';
import { FETCH_WATCH_LIST } from './constants';

export function* fetchWatchListSaga({ payload }) {
  const { idArray, modalState } = payload;
  const query = `
    query {
      getUserWatchList(idArray: ${JSON.stringify(idArray)}) {
        id,
        Issue,
        Amount,
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { getUserWatchList },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchWatchListSuccess());
    yield put(openModalState({ modalState, tableData: getUserWatchList }));
  } catch (error) {
    yield put(fetchWatchListFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_WATCH_LIST, fetchWatchListSaga);
}

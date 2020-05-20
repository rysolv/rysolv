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
  const queryDictionary = {
    issueWatchList: `
    query {
      getWatchList(idArray: ${JSON.stringify(idArray)}, type: "${modalState}") {
        id,
        User,
        profilePic,
      }
    }
  `,
  };
  try {
    const graphql = JSON.stringify({
      query: queryDictionary[modalState],
      variables: {},
    });
    const {
      data: { getWatchList },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchWatchListSuccess());
    yield put(openModalState({ modalState, tableData: getWatchList }));
  } catch (error) {
    yield put(fetchWatchListFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_WATCH_LIST, fetchWatchListSaga);
}

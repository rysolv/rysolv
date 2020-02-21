import { takeLatest } from 'redux-saga/effects';
import TEST from './constants';

export function* fetchTestSaga() {
  console.log('data');
}

export default function* watcherSaga() {
  yield takeLatest(TEST, fetchTestSaga);
}

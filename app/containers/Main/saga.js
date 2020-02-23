import { takeLatest } from 'redux-saga/effects';
import TEST from './constants';

export function* fetchTestSaga() {}

export default function* watcherSaga() {
  yield takeLatest(TEST, fetchTestSaga);
}

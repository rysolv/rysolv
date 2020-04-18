import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import { verifyRecaptchaFailure, verifyRecaptchaSuccess } from './actions';
import { VERIFY_RECAPTCHA } from './constants';

export function* verifyRecaptchaSaga({ payload }) {
  try {
    const graphql = JSON.stringify({});
    yield call(post, '/graphql', graphql);
    yield put(verifyRecaptchaSuccess());
  } catch (error) {
    const { resetRecaptcha } = payload;
    yield call(resetRecaptcha);
    yield put(verifyRecaptchaFailure());
  }
}

export default function* watcherSaga() {
  yield takeLatest(VERIFY_RECAPTCHA, verifyRecaptchaSaga);
}

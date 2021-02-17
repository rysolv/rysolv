import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { post } from 'utils/request';

import {
  changeView,
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  submitUserResponseFailure,
  submitUserResponseSuccess,
} from './actions';
import { FETCH_QUESTIONS, SUBMIT_USER_RESPONSE } from './constants';

export function* fetchQuestionsSaga({ payload }) {
  const { category } = payload;
  const query = `
    query{
      getQuestions(category: "${category}") {
        __typename
        ... on QuestionArray {
          questionArray {
            id
            limit
            questionKey
            questionText
            responses {
              id
              responseKey
              value
            }
            subtext
          }
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
        getQuestions: { __typename, message, questionArray },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchQuestionsSuccess({ questions: questionArray }));
  } catch (error) {
    yield put(fetchQuestionsFailure({ error }));
  }
}

export function* submitUserResponseSaga({ payload }) {
  const { responseArray } = payload;
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId }) =>
      `{
      questionId: "${questionId}",
      questionKey: "${questionKey}",
      responseId: "${responseId}",
    }`,
  );
  const query = `
    mutation {
      postUserResponse(responseArray: [${formattedResponse}]) {
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
    yield call(post, '/graphql', graphql);
    yield put(changeView({ view: 2 }));
    yield put(push('/jobs'));
    yield put(submitUserResponseSuccess());
  } catch (error) {
    yield put(push('/jobs'));
    yield put(submitUserResponseFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(SUBMIT_USER_RESPONSE, submitUserResponseSaga);
}

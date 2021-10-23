import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from 'utils/request';

import {
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  submitCompanyResponseFailure,
  submitCompanyResponseSuccess,
} from './actions';
import { FETCH_QUESTIONS, SUBMIT_COMPANY_RESPONSE } from './constants';

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
            required
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

export function* submitCompanyResponseSaga({ payload }) {
  const { responseArray } = payload;
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId, value }) => `{
        questionId: "${questionId}",
        questionKey: "${questionKey}",
        responseId: "${responseId}",
        value: "${value}",
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
    const {
      data: {
        postUserResponse: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(submitCompanyResponseSuccess());
  } catch (error) {
    yield put(submitCompanyResponseFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(SUBMIT_COMPANY_RESPONSE, submitCompanyResponseSaga);
}

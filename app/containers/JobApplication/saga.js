import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { post } from 'utils/request';

import {
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

export function* submitUserResponseSaga({ payload }) {
  const { responseArray } = payload;
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId, value }) => {
      const { file, fileExtension } = value;
      const generateFormattedValue = () => {
        switch (questionKey) {
          case 'preferred_location': {
            return `{
              country: "${value.country}",
              countryCode: "${value.countryCode}",
              formattedAddress: "${value.formattedAddress}",
              utcOffset: ${value.utcOffset}
            }`;
          }
          case 'resume': {
            return `{
              file: "${file}",
              fileExtension: "${fileExtension}",
            }`;
          }
          case 'skills': {
            return `{
              beginner: ${value.beginner},
              expert: ${value.expert},
              intermediate: ${value.intermediate},
              skill: "${value.skill}"
            }`;
          }
          default: {
            return `"${value}"`;
          }
        }
      };
      const formattedValue = generateFormattedValue();
      return `{
      questionId: "${questionId}",
      questionKey: "${questionKey}",
      responseId: "${responseId}",
      value: ${formattedValue},
    }`;
    },
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
    yield put(push('/dashboard'));
    yield put(submitUserResponseSuccess());
  } catch (error) {
    yield put(push('/apply'));
    yield put(submitUserResponseFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(SUBMIT_USER_RESPONSE, submitUserResponseSaga);
}

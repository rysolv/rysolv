import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { post } from 'utils/request';

import {
  changeView,
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  submitCompanyResponseFailure,
  submitCompanyResponseSuccess,
  submitContractAcceptedFailure,
  submitContractAcceptedSuccess,
  submitContractAccepted,
} from './actions';
import {
  FETCH_QUESTIONS,
  SUBMIT_COMPANY_RESPONSE,
  SUBMIT_CONTRACT_ACCEPTED,
} from './constants';

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
  const { companyId, form } = payload;
  const { contractAccepted, description, location, name, size, website } = form;
  const query = `
      mutation {
        transformCompany(
          companyInput: {
            companyId: "${companyId}",
            description: ${JSON.stringify(description)},
            location: "${location}",
            name: "${name}",
            size: "${size}",
            website: "${website}",
          }
        ) {
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
        transformCompany: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(submitCompanyResponseSuccess());
    yield put(submitContractAccepted({ companyId, contractAccepted }));
  } catch (error) {
    yield put(changeView({ view: 0 }));
    yield put(submitCompanyResponseFailure({ error: { message: error } }));
  }
}

export function* submitContractAcceptedSaga({ payload }) {
  const { companyId, contractAccepted } = payload;
  const query = `
      mutation {
        postContractAccepted(companyId: "${companyId}", contractAccepted: ${contractAccepted}) {
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
        postContractAccepted: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(submitContractAcceptedSuccess());
    yield put(push('/company/dashboard'));
  } catch (error) {
    yield put(submitContractAcceptedFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(SUBMIT_COMPANY_RESPONSE, submitCompanyResponseSaga);
  yield takeLatest(SUBMIT_CONTRACT_ACCEPTED, submitContractAcceptedSaga);
}

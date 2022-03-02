import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { updateActiveUser } from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  changeView,
  fetchContractFailure,
  fetchContractSuccess,
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  submitCompanyResponseFailure,
  submitCompanyResponseSuccess,
  submitContractAccepted,
  submitContractAcceptedFailure,
  submitContractAcceptedSuccess,
} from './actions';
import {
  FETCH_CONTRACT,
  FETCH_QUESTIONS,
  SUBMIT_COMPANY_RESPONSE,
  SUBMIT_CONTRACT_ACCEPTED,
} from './constants';

export function* fetchContractSaga() {
  // Hard coded to startup for initial account creation
  const query = `
    query{
      getContract(plan: "startup") {
        __typename
        ... on Contract {
          body
          subtitle
          title
          version
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
        getContract: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchContractSuccess({ contract: restProps }));
  } catch (error) {
    yield put(fetchContractFailure({ error }));
  }
}

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
  const { description, location, name, plan, size, website } = form;
  const formattedLocation = `{
    country: "${location.country}",
    countryCode: "${location.countryCode}",
    formattedAddress: "${location.formattedAddress}",
    utcOffset: ${location.utcOffset}
  }`;
  const query = `
      mutation {
        transformCompany(
          companyInput: {
            companyId: "${companyId}",
            description: ${JSON.stringify(description)},
            location: ${formattedLocation},
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
    yield put(submitContractAccepted({ companyId, plan }));
  } catch (error) {
    yield put(changeView({ view: 0 }));
    yield put(submitCompanyResponseFailure({ error: { message: error } }));
  }
}

export function* submitContractAcceptedSaga({ payload }) {
  const { companyId, plan } = payload;
  const query = `
      mutation {
        postContractAccepted(companyId: "${companyId}", plan: "${plan}") {
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
    yield put(
      updateActiveUser({
        isContractAccepted: true,
        isQuestionnaireComplete: true,
      }),
    );
    yield put(push('/company/dashboard/add-position'));
  } catch (error) {
    yield put(submitContractAcceptedFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_CONTRACT, fetchContractSaga);
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(SUBMIT_COMPANY_RESPONSE, submitCompanyResponseSaga);
  yield takeLatest(SUBMIT_CONTRACT_ACCEPTED, submitContractAcceptedSaga);
}

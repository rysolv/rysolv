import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { v4 as uuidv4 } from 'uuid';

import { post } from 'utils/request';

import {
  createPositionFailure,
  createPositionSuccess,
  deletePositionFailure,
  deletePositionSuccess,
  editCompanyFailure,
  editCompanySuccess,
  editPositionFailure,
  editPositionSuccess,
  fetchCompanyFailure,
  fetchCompanyPositions,
  fetchCompanyPositionsFailure,
  fetchCompanyPositionsSuccess,
  fetchCompanySuccess,
  fetchPositionCandidatesFailure,
  fetchPositionCandidatesSuccess,
  fetchPositionFailure,
  fetchPositionSuccess,
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  matchCandidates,
  matchCandidatesFailure,
  matchCandidatesSuccess,
  notifyCandidateFailure,
  notifyCandidateSuccess,
  resetFormState,
  saveCandidateFailure,
  saveCandidateSuccess,
} from './actions';
import {
  CREATE_POSITION,
  DELETE_POSITION,
  EDIT_COMPANY,
  EDIT_POSITION,
  FETCH_COMPANY_POSITIONS,
  FETCH_COMPANY,
  FETCH_POSITION_CANDIDATES,
  FETCH_POSITION,
  FETCH_QUESTIONS,
  MATCH_CANDIDATES,
  messageSuccess,
  NOTIFY_CANDIDATE,
  SAVE_CANDIDATE,
} from './constants';

export function* createPositionSaga({ payload }) {
  const { companyId, responseArray } = payload;
  const positionId = uuidv4();
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId, value }) => {
      const generateFormattedValue = () => {
        switch (questionKey) {
          case 'description': {
            return JSON.stringify(value);
          }
          case 'location': {
            return `{
              country: "${value.country}",
              countryCode: "${value.countryCode}",
              formattedAddress: "${value.formattedAddress}",
              utcOffset: ${value.utcOffset}
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
      postPositionResponse(
        companyId: "${companyId}",
        positionId: "${positionId}",
        responseArray: [${formattedResponse}]
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
        postPositionResponse: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(createPositionSuccess({ positionId }));
    yield put(fetchCompanyPositions({ companyId }));
    yield put(matchCandidates({ positionId }));
    yield put(push('/company/dashboard'));
  } catch (error) {
    yield put(createPositionFailure({ error: { message: error } }));
  }
}

export function* deletePositionSaga({ payload }) {
  const { positionId } = payload;
  const query = `
    mutation{
      deletePosition(positionId: "${positionId}") {
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
        deletePosition: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(deletePositionSuccess());
    yield put(push('/company/dashboard'));
  } catch (error) {
    yield put(deletePositionFailure({ error: { message: error } }));
  }
}

export function* editCompanySaga({ payload }) {
  const { companyId, form } = payload;
  const { description, location, logo, name, size, website } = form;
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
          logo: "${logo}",
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
    yield put(editCompanySuccess());
    yield put(push('/company/dashboard'));
  } catch (error) {
    yield put(editCompanyFailure({ error: { message: error } }));
  }
}

export function* editPositionSaga({ payload }) {
  const { companyId, positionId, responseArray } = payload;
  const formattedResponse = responseArray.map(
    ({ questionId, questionKey, responseId, value }) => {
      const generateFormattedValue = () => {
        switch (questionKey) {
          case 'description': {
            return `${JSON.stringify(value)}`;
          }
          case 'location': {
            return `{
              country: "${value.country}",
              countryCode: "${value.countryCode}",
              formattedAddress: "${value.formattedAddress}",
              utcOffset: ${value.utcOffset}
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
      transformPositionResponse(
        positionId: "${positionId}",
        responseArray: [${formattedResponse}]
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
        transformPositionResponse: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(editPositionSuccess());
    yield put(fetchCompanyPositions({ companyId }));
    yield put(matchCandidates({ positionId }));
    yield put(push('/company/dashboard'));
  } catch (error) {
    yield put(editPositionFailure({ error: { message: error } }));
  }
}

export function* fetchCompanyPositionsSaga({ payload }) {
  const { companyId } = payload;
  const query = `
    query {
      getCompanyPositions(companyId: "${companyId}") {
        __typename
        ... on CompanyPositionsArray {
          positions {
            id
            isActive
            location
            title
          }
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getCompanyPositions: { positions },
      },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchCompanyPositionsSuccess({ positions }));
  } catch (error) {
    yield put(fetchCompanyPositionsFailure({ error }));
  }
}

export function* fetchCompanySaga({ payload }) {
  const { companyId } = payload;
  const query = `
    query {
      oneCompany(companyId: "${companyId}") {
        __typename
        ... on Company {
          description
          location
          logo
          name
          size
          website
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
        oneCompany: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchCompanySuccess({ company: restProps }));
  } catch (error) {
    yield put(fetchCompanyFailure({ error }));
  }
}

export function* fetchPositionCandidatesSaga({ payload }) {
  const { positionId, saved } = payload;
  const query = `
    query {
      getPositionCandidates(positionId: "${positionId}", saved: ${!!saved}) {
        firstName
        id
        isSaved
        languages
        lastName
        lastPosition
        location
        percentMatch
        profilePic
        salary
        threadId
        type
        yearsOfExperience
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: { getPositionCandidates: candidates },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchPositionCandidatesSuccess({ candidates }));
  } catch (error) {
    yield put(fetchPositionCandidatesFailure({ error }));
  }
}

export function* fetchPositionSaga({ payload }) {
  const { positionId } = payload;
  const query = `
    query {
      onePosition(positionId: "${positionId}") {
        __typename
        ... on Position {
          description
          experience
          isActive
          location
          role
          salary
          skills
          timezone
          title
          type
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
        onePosition: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchPositionSuccess({ position: restProps }));
  } catch (error) {
    yield put(fetchPositionFailure({ error }));
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
    yield put(fetchQuestionsSuccess({ category, questions: questionArray }));
  } catch (error) {
    yield put(fetchQuestionsFailure({ error }));
  }
}

export function* matchCandidatesSaga({ payload }) {
  const { positionId } = payload;
  const query = `
    mutation{
      matchCandidates(positionId: "${positionId}") {
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
        matchCandidates: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(matchCandidatesSuccess());
  } catch (error) {
    yield put(matchCandidatesFailure());
  }
}

export function* notifyCandidateSaga({ payload }) {
  const { body, positionId, candidateId } = payload;
  const query = `
    mutation{
      createMessage(messageInput: {
        body: ${JSON.stringify(body)},
        positionId: "${positionId}",
        toUserId: "${candidateId}",
      }) {
        __typename
        ... on MessageResponse {
          body
          createdDate
          firstName
          lastName
          profilePic
          readDate
          threadId
          username
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
        createMessage: { __typename, message, threadId },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(
      notifyCandidateSuccess({
        candidateId,
        message: messageSuccess,
        threadId,
      }),
    );
    yield put(resetFormState({ category: 'scheduleInterview' }));
  } catch (error) {
    yield put(notifyCandidateFailure({ error: { message: error } }));
  }
}

export function* saveCandidateSaga({ payload }) {
  const { candidateId, positionId } = payload;
  const query = `
    mutation {
      saveCandidate(candidateId: "${candidateId}", positionId: "${positionId}") {
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
        saveCandidate: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(saveCandidateSuccess({ candidateId }));
  } catch (error) {
    yield put(saveCandidateFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeEvery(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(CREATE_POSITION, createPositionSaga);
  yield takeLatest(DELETE_POSITION, deletePositionSaga);
  yield takeLatest(EDIT_COMPANY, editCompanySaga);
  yield takeLatest(EDIT_POSITION, editPositionSaga);
  yield takeLatest(FETCH_COMPANY_POSITIONS, fetchCompanyPositionsSaga);
  yield takeLatest(FETCH_COMPANY, fetchCompanySaga);
  yield takeLatest(FETCH_POSITION_CANDIDATES, fetchPositionCandidatesSaga);
  yield takeLatest(FETCH_POSITION, fetchPositionSaga);
  yield takeLatest(MATCH_CANDIDATES, matchCandidatesSaga);
  yield takeLatest(NOTIFY_CANDIDATE, notifyCandidateSaga);
  yield takeLatest(SAVE_CANDIDATE, saveCandidateSaga);
}

/* eslint-disable indent, no-nested-ternary */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { post } from 'utils/request';

import {
  closeModalState,
  editUserResponseFailure,
  editUserResponseSuccess,
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  fetchUserDashboardFailure,
  fetchUserDashboardSuccess,
  fetchUserResponseFailure,
  fetchUserResponseSuccess,
  setHiringStatusFailure,
  setHiringStatusSuccess,
  updateUserLinksFailure,
  updateUserLinksSuccess,
  updateUserSkillsFailure,
  updateUserSkillsSuccess,
} from './actions';
import {
  EDIT_USER_RESPONSE,
  FETCH_QUESTIONS,
  FETCH_USER_DASHBOARD,
  FETCH_USER_RESPONSE,
  SET_HIRING_STATUS,
  UPDATE_USER_SKILLS,
  UPDATE_USER_LINKS,
} from './constants';

export function* editUserResponseSaga({ payload }) {
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
      transformUserResponse(
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
        transformUserResponse: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(editUserResponseSuccess());
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(editUserResponseFailure({ error: { message: error } }));
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
    yield put(fetchQuestionsFailure({ error: { message: error } }));
  }
}

export function* fetchUserDashboardSaga() {
  const query = `
      query {
        getUserDashboard {
          __typename
          ... on User {
            firstName
            githubId
            githubLink
            hiringStatus
            id
            isGithubVerified
            issues
            lastName
            matches
            notifications
            personalLink
            profilePic
            skills
            stackoverflowLink
            surveyComplete
            unreadMessages
          }
          ...on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getUserDashboard: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserDashboardSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchUserDashboardFailure({ error: { message: error } }));
  }
}

export function* fetchUserResponseSaga() {
  const query = `
    query {
      getUserResponse {
        __typename
        ... on User {
          desiredRole
          experience
          isActive
          preferredLocation
          resume
          skills
          targetSalary
          timezone
          type
          usCitizen
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
        getUserResponse: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserResponseSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchUserResponseFailure({ error: { message: error } }));
  }
}

export function* setHiringStatusSaga({ payload }) {
  const { hiringStatus } = payload;

  // Hiring status is set to 'active', 'inactive', 'undeclared'
  // We use this to determine whether the user has ever indicated
  // interest in the hiring platform

  const query = `
      mutation {
        setHiringStatus(hiringStatus: "${hiringStatus}") {
          __typename
          ... on Success {
            message
          }
          ...on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        setHiringStatus: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;

    yield put(
      setHiringStatusSuccess({
        hiringStatus,
      }),
    );
  } catch (error) {
    yield put(setHiringStatusFailure({ error: { message: error } }));
  }
}

export function* updateUserSkillsSaga({ payload }) {
  const { skills } = payload;
  const formattedResponse = skills.map(
    ({ beginner, expert, intermediate, skill }) => `{
      beginner: ${beginner},
      expert: ${expert},
      intermediate: ${intermediate},
      skill: "${skill}"
    }`,
  );
  const query = `
    mutation {
      transformUserSkills(
        skillsArray: [${formattedResponse}]
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
        transformUserSkills: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(updateUserSkillsSuccess());
    yield put(closeModalState());
  } catch (error) {
    yield put(updateUserSkillsFailure({ error: { message: error } }));
  }
}

export function* updateUserLinksSaga({ payload }) {
  const { githubLink, personalLink, stackoverflowLink } = payload;
  const query = `
    mutation {
      transformUser(userInput: {
        githubLink: "${githubLink}" 
        personalLink: "${personalLink}"
        stackoverflowLink: "${stackoverflowLink}"
      }) {
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
        transformUser: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(updateUserLinksSuccess());
    yield put(closeModalState());
  } catch (error) {
    yield put(updateUserLinksFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(EDIT_USER_RESPONSE, editUserResponseSaga);
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(FETCH_USER_DASHBOARD, fetchUserDashboardSaga);
  yield takeLatest(FETCH_USER_RESPONSE, fetchUserResponseSaga);
  yield takeLatest(SET_HIRING_STATUS, setHiringStatusSaga);
  yield takeLatest(UPDATE_USER_LINKS, updateUserLinksSaga);
  yield takeLatest(UPDATE_USER_SKILLS, updateUserSkillsSaga);
}

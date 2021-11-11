import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { resetState } from 'containers/Main/actions';
import { changeView } from 'containers/Jobs/actions';
import { incrementResetStep, incrementStep } from 'containers/Signin/actions';
import { post } from 'utils/request';

import {
  FETCH_ACTIVE_USER,
  GITHUB_SIGN_IN,
  githubSignInError,
  githubSignUpError,
  RESEND_CODE,
  RESEND_SIGN_UP,
  RESET_PASSWORD,
  SEND_LINK,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  signInError,
  signUpError,
  VERIFY_EMAIL,
  verifyEmailError,
} from './constants';
import {
  fetchActiveUser,
  fetchActiveUserFailure,
  fetchActiveUserSuccess,
  githubSignInFailure,
  githubSignInSuccess,
  resendCodeFailure,
  resendCodeSuccess,
  resendSignUp,
  resetPasswordFailure,
  resetPasswordSuccess,
  sendLinkResponse,
  signInFailure,
  signInSuccess,
  signOutResponse,
  signUpFailure,
  signUpSuccess,
  verifyEmailFailure,
  verifyEmailSuccess,
} from './actions';

export function* fetchActiveUserSaga() {
  const query = `
    query{
      getUserSettings {
        __typename
        ... on User {
          attempting
          balance
          bounties {
            id
            userAccepted
          }
          email
          firstName
          githubId
          id
          isGithubVerified
          surveyComplete
          issues
          lastName
          notifications
          profilePic
          pullRequests
          rep
          repos
          upvotes
          username
          watching
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
        getUserSettings: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchActiveUserSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchActiveUserFailure({ error: { message: error } }));
  }
}

export function* githubSignInSaga({ payload }) {
  const { code, origin } = payload;
  const signInQuery = `
    query {
      githubSignIn(code: "${code}", origin: "${origin}") {
        __typename
        ... on User {
          attempting
          balance
          email
          firstName
          id
          isGithubVerified
          surveyComplete
          issues
          lastName
          profilePic
          pullRequests
          rep
          repos
          upvotes
          username
          watching
        }
        ... on Error {
          message
        }
      }
    }
  `;
  const signUpQuery = `
    query {
      githubSignIn(code: "${code}", origin: "${origin}") {
        __typename
        ... on User {
          email
          id
          username
        }
        ... on Error {
          message
        }
      }
    }
  `;
  const query =
    origin === 'jobs' || origin === 'signin' ? signInQuery : signUpQuery;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        githubSignIn: { __typename, surveyComplete, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    const routeDictionary = {
      jobs: '/jobs?question=1',
      signin: '/dashboard',
      signup: '/dashboard',
    };
    const route = routeDictionary[origin];
    if (origin === 'jobs') {
      if (surveyComplete) {
        yield put(changeView({ view: 2 }));
      } else {
        yield put(changeView({ view: 1 }));
      }
    }
    yield put(githubSignInSuccess({ user: restProps }));
    yield put(push(route));
  } catch (error) {
    const { message } = error;
    const githubError =
      origin === 'jobs' || origin === 'signin'
        ? githubSignInError
        : githubSignUpError;
    const routeDictionary = {
      jobs: '/jobs',
      signin: '/signin',
      signup: '/signup',
    };
    const route = routeDictionary[origin];
    const messageToRender = message || githubError;
    yield put(githubSignInFailure({ error: { message: messageToRender } }));
    yield put(push(route));
  }
}

export function* removeUserData() {
  yield put(resetState());
}

export function* resendCodeSaga({ payload }) {
  const { email } = payload;
  const query = `
    query {
      resendCode(email: "${email}") {
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
        resendCode: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    yield put(resendCodeSuccess({ message }));
  } catch (error) {
    const { message } = error;
    yield put(resendCodeFailure({ error: { message } }));
  }
}

export function* resendSignUpSaga({ payload }) {
  const { username } = payload;
  const query = `
    query {
      oneUserSignUp(email: "${username}") {
        __typename
        ... on User {
          email
          id
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
        oneUserSignUp: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(incrementStep({ step: 2 }));
    yield put(signUpSuccess({ activeUser: restProps }));
  } catch (error) {
    const { message } = error;
    const messageToRender = message || signInError;
    yield put(signInFailure({ error: { message: messageToRender } }));
  }
}

export function* resetPasswordSaga({ payload }) {
  const { email, password, verificationCode } = payload;
  const query = `
    query{
      resetPassword(code: "${verificationCode}", email: "${email}", password: "${password}")  {
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
        resetPassword: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(incrementResetStep({ step: 3 }));
    yield put(resetPasswordSuccess({ message }));
  } catch (error) {
    yield put(incrementResetStep({ step: 4 }));
    yield put(resetPasswordFailure({ error: { message: error } }));
  }
}

export function* sendLinkSaga({ payload }) {
  const { email } = payload;
  const query = `
    query{
      sendLink(email: "${email}")  {
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
    yield put(incrementResetStep({ step: 2 }));
    yield put(sendLinkResponse());
  } catch (error) {
    yield put(incrementResetStep({ step: 2 }));
    yield put(sendLinkResponse());
  }
}

export function* signInSaga({ payload }) {
  const { password, username } = payload;
  const query = `
    mutation{
      signIn(password: "${password}", username: "${username}") {
        __typename
        ... on User {
          attempting
          balance
          email
          firstName
          id
          isGithubVerified
          issues
          lastName
          profilePic
          pullRequests
          rep
          repos
          upvotes
          username
          watching
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
        signIn: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    yield put(signInSuccess({ user: restProps }));
  } catch (error) {
    const { message } = error;
    if (message === 'User is not confirmed.') {
      yield put(resendSignUp({ username }));
    } else {
      const messageToRender = message || signInError;
      yield put(signInFailure({ error: { message: messageToRender } }));
    }
  }
}

export function* signOutSaga() {
  const query = `
    mutation{
      signOut {
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
        signOut: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield call(removeUserData);
    yield put(signOutResponse());
  } catch (error) {
    yield call(removeUserData);
    yield put(signOutResponse());
  }
}

export function* signUpSaga({ payload }) {
  const { email, firstName, lastName, password, username } = payload;
  const query = `
    mutation {
      createUser(
        userInput: {
          email: "${email}"
          firstName: "${firstName}"
          lastName: "${lastName}"
          password: "${password}"
          username: "${username}"
        }
      ) {
        __typename
        ... on User {
          email
          id
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
        createUser: {
          __typename: createUserTypename,
          message: createUserMessage,
          ...restProps
        },
      },
    } = yield call(post, '/graphql', graphql);
    if (createUserTypename === 'Error') throw new Error(createUserMessage);
    yield put(incrementStep({ step: 2 }));
    yield put(signUpSuccess({ activeUser: restProps }));
  } catch (error) {
    const { message } = error;
    const messageToRender = message || signUpError;
    yield put(signUpFailure({ error: { message: messageToRender } }));
  }
}

export function* verifyEmailSaga({ payload }) {
  const { userEmail, userId, verificationCode } = payload;
  const code = verificationCode.value;
  // Update email to verified - return user token
  const query = `
    mutation {
      verifyUserEmail(code: "${code}", email: "${userEmail}", userId: "${userId}")
        {
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
        verifyUserEmail: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    yield put(fetchActiveUser());
    yield put(verifyEmailSuccess());
  } catch (error) {
    const { message } = error;
    const messageToRender = message || verifyEmailError;
    yield put(verifyEmailFailure({ error: { message: messageToRender } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ACTIVE_USER, fetchActiveUserSaga);
  yield takeLatest(GITHUB_SIGN_IN, githubSignInSaga);
  yield takeLatest(RESEND_CODE, resendCodeSaga);
  yield takeLatest(RESEND_SIGN_UP, resendSignUpSaga);
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(SEND_LINK, sendLinkSaga);
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
  yield takeLatest(SIGN_UP, signUpSaga);
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
}

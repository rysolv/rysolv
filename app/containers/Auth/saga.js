import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { resetState } from 'containers/Main/actions';
import { incrementStep } from 'containers/Signin/actions';
import { post } from 'utils/request';

import {
  FETCH_ACTIVE_USER,
  GITHUB_SIGN_IN,
  githubSignInError,
  githubSignUpError,
  RESEND_SIGN_UP,
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
  resendSignUp,
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
          email
          firstName
          id
          isGithubVerified
          issues
          lastName
          organizations
          profilePic
          pullRequests
          rep
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
  const { code, isSignIn } = payload;
  const signInQuery = `
    query {
      githubSignIn(code: "${code}", isSignIn: ${isSignIn}) {
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
          organizations
          profilePic
          pullRequests
          rep
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
      githubSignIn(code: "${code}", isSignIn: ${isSignIn}) {
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
  const query = isSignIn ? signInQuery : signUpQuery;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        githubSignIn: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    const route = isSignIn ? '/issues' : '/settings';
    yield put(githubSignInSuccess({ user: restProps }));
    yield put(push(route));
  } catch (error) {
    const { message } = error;
    const githubError = isSignIn ? githubSignInError : githubSignUpError;
    const route = isSignIn ? '/signin' : '/signup';
    const messageToRender = message || githubError;
    yield put(githubSignInFailure({ error: { message: messageToRender } }));
    yield put(push(route));
  }
}

export function* removeUserData() {
  yield put(resetState());
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
          organizations
          profilePic
          pullRequests
          rep
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
  yield takeLatest(RESEND_SIGN_UP, resendSignUpSaga);
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
  yield takeLatest(SIGN_UP, signUpSaga);
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
}

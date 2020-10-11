import { call, put, takeLatest } from 'redux-saga/effects';
import Auth from '@aws-amplify/auth';

import { resetState } from 'containers/Main/actions';
import { incrementStep } from 'containers/Signin/actions';
import { fetchCurrentSession } from 'utils/authHelper';
import { post } from 'utils/request';

import {
  FETCH_ACTIVE_USER,
  FETCH_USER_SESSION,
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
  fetchUserSessionFailure,
  fetchUserSessionSuccess,
  resendSignUp,
  signIn,
  signInFailure,
  signInSuccess,
  signOut,
  signOutResponse,
  signUpFailure,
  signUpSuccess,
  verifyEmailFailure,
  verifyEmailSuccess,
} from './actions';

export function* fetchActiveUserSaga() {
  try {
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
    const token = yield call(fetchCurrentSession);

    const graphql = JSON.stringify({
      query,
      variables: { token },
    });
    const {
      data: {
        getUserSettings: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchActiveUserSuccess({ user: restProps }));
  } catch (error) {
    yield put(signOut());
    yield put(fetchActiveUserFailure({ error: { message: error } }));
  }
}

export function* fetchUserSessionSaga() {
  const fetchActiveUserSession = async () => {
    const { username } = await Auth.currentAuthenticatedUser();
    return { username };
  };

  try {
    const { username: userId } = yield call(fetchActiveUserSession);
    yield put(fetchActiveUser({ userId }));
    yield put(fetchUserSessionSuccess());
  } catch (error) {
    yield put(fetchUserSessionFailure());
  }
}

export function* removeUserData() {
  yield put(resetState());
}

export function* resendSignUpSaga({ payload }) {
  const { username } = payload;

  const cognitoResendSignUp = async () => {
    await Auth.resendSignUp(username);
  };

  try {
    yield call(cognitoResendSignUp);
    // Get user account that has been signed up but not email verified
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
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
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

  const cognitoSignIn = async () => {
    const user = await Auth.signIn(username, password);
    return user;
  };

  const cognitoSignOut = async () => {
    await Auth.signOut();
  };

  try {
    yield call(cognitoSignIn);

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
    const token = yield call(fetchCurrentSession);

    const graphql = JSON.stringify({
      query,
      variables: { token },
    });
    const {
      data: {
        getUserSettings: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(signInSuccess({ user: restProps }));
  } catch (error) {
    const { code, message } = error;
    if (code === 'UserNotConfirmedException') {
      yield put(resendSignUp({ username }));
    } else {
      const messageToRender = message || signInError;
      yield call(cognitoSignOut);
      yield put(signInFailure({ error: { message: messageToRender } }));
    }
  }
}

export function* signOutSaga() {
  const cognitoSignOut = async () => {
    await Auth.signOut();
  };
  try {
    yield call(cognitoSignOut);
    yield call(removeUserData);
    yield put(signOutResponse());
  } catch (error) {
    yield call(removeUserData);
    yield put(signOutResponse());
  }
}

export function* signUpSaga({ payload }) {
  const { email, firstName, lastName, password, username } = payload;

  const cognitoSignUp = async () => {
    const signUpResponse = await Auth.signUp({
      password,
      username: email,
    });
    return signUpResponse;
  };

  try {
    // Check duplicate username / email
    const duplicateUserQuery = `
      query {
        checkDuplicateUser(email: "${email}", username: "${username}") {
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
    const request = JSON.stringify({
      query: duplicateUserQuery,
      variables: {},
    });
    const {
      data: {
        checkDuplicateUser: {
          __typename: checkDuplicateUserTypename,
          message: checkDuplicateUserMessage,
        },
      },
    } = yield call(post, '/graphql', request);
    if (checkDuplicateUserTypename === 'Error')
      throw new Error(checkDuplicateUserMessage);

    // Register email / pasword with Cognito
    const { userSub } = yield call(cognitoSignUp);

    // Create User account with Cognito id
    const query = `
      mutation {
        createUser(
          userInput: {
            id: "${userSub}",
            email: "${email}",
            firstName: "${firstName}",
            lastName: "${lastName}",
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
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
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
  const { password, userEmail, userId, verificationCode } = payload;

  const cognitoSignUp = async () => {
    const signUpResponse = await Auth.confirmSignUp(
      userEmail,
      verificationCode.value,
    );
    return signUpResponse;
  };

  try {
    // Register email / pasword with Cognito
    yield call(cognitoSignUp);

    // Update email to be verified
    const query = `
      mutation {
        verifyUserEmail( userId: "${userId}")
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
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        verifyUserEmail: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    yield put(signIn({ password, username: userEmail }));
    yield put(verifyEmailSuccess());
  } catch (error) {
    const { message } = error;
    const messageToRender = message || verifyEmailError;
    yield put(verifyEmailFailure({ error: { message: messageToRender } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ACTIVE_USER, fetchActiveUserSaga);
  yield takeLatest(FETCH_USER_SESSION, fetchUserSessionSaga);
  yield takeLatest(RESEND_SIGN_UP, resendSignUpSaga);
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
  yield takeLatest(SIGN_UP, signUpSaga);
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
}

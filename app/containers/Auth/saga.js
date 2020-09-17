import { call, put, takeLatest } from 'redux-saga/effects';
import Auth from '@aws-amplify/auth';

import { resetState } from 'containers/Main/actions';
import { incrementStep } from 'containers/Signin/actions';
import { post } from 'utils/request';

import {
  FETCH_ACTIVE_USER,
  FETCH_USER_SESSION,
  RESEND_SIGN_UP,
  SEARCH_ORGANIZATIONS,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  VERIFY_EMAIL,
} from './constants';
import {
  fetchActiveUser,
  fetchActiveUserFailure,
  fetchActiveUserSuccess,
  fetchUserSessionFailure,
  fetchUserSessionSuccess,
  resendSignUp,
  searchOrganizationsFailure,
  searchOrganizationsSuccess,
  signIn,
  signInFailure,
  signInSuccess,
  signOut,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
  verifyEmailFailure,
  verifyEmailSuccess,
} from './actions';

export function* fetchActiveUserSaga({ payload }) {
  const { userId } = payload;
  try {
    const query = `
    query{
      oneUser(id: "${userId}") {
        attempting,
        balance,
        email,
        firstName,
        id,
        isGithubVerified,
        issues,
        lastName,
        organizations,
        profilePic,
        pullRequests,
        rep,
        upvotes,
        username,
        watching,
      }
    }`;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneUser },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchActiveUserSuccess({ oneUser }));
  } catch (error) {
    yield put(signOut());
    yield put(fetchActiveUserFailure({ error }));
  }
}

export function* fetchUserSessionSaga() {
  const fetchCurrentSession = async () => {
    const { username } = await Auth.currentAuthenticatedUser();
    return { username };
  };

  try {
    const { username: userId } = yield call(fetchCurrentSession);
    yield put(fetchActiveUser({ userId }));
    yield put(fetchUserSessionSuccess());
  } catch (error) {
    yield put(fetchUserSessionFailure({ error }));
  }
}

export function* getUserOrganizationsSaga({ payload }) {
  const { id } = payload;
  const query = `
    query {
      getUserOrganizations(id: "${id}") {
        createdDate,
        description,
        id,
        issues,
        logo,
        modifiedDate,
        name,
        organizationUrl,
        repoUrl,
        totalFunded,
        verified,
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { getUserOrganizations },
    } = yield call(post, '/graphql', graphql);
    yield put(
      searchOrganizationsSuccess({ organizations: getUserOrganizations }),
    );
  } catch (error) {
    yield put(searchOrganizationsFailure({ error }));
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
          email,
          id,
          username,
        }
      }
    `;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneUserSignUp },
    } = yield call(post, '/graphql', graphql);
    yield put(incrementStep({ step: 2 }));
    yield put(signUpSuccess({ activeUser: oneUserSignUp }));
  } catch (error) {
    yield put(signInFailure({ error }));
  }
}

export function* signInSaga({ payload }) {
  const { username, password } = payload;

  const cognitoSignIn = async () => {
    const user = await Auth.signIn(username, password);
    return user;
  };

  const cognitoSignOut = async () => {
    await Auth.signOut();
  };

  try {
    const {
      attributes: { sub: userId },
    } = yield call(cognitoSignIn);

    const query = `
    query{
      oneUser(id: "${userId}") {
        attempting,
        balance,
        email,
        firstName,
        id,
        isGithubVerified,
        issues,
        lastName,
        organizations,
        profilePic,
        pullRequests,
        rep,
        upvotes,
        username,
        watching,
      }
    }`;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneUser },
    } = yield call(post, '/graphql', graphql);
    yield put(signInSuccess({ oneUser }));
  } catch (error) {
    const { code } = error;
    if (code === 'UserNotConfirmedException') {
      yield put(resendSignUp({ username }));
    } else {
      yield call(cognitoSignOut);
      yield put(signInFailure({ error }));
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
    yield put(signOutSuccess());
  } catch (error) {
    yield call(removeUserData);
    yield put(signOutFailure());
  }
}

export function* signUpSaga({ payload }) {
  const { username, password, firstName, lastName, email } = payload;

  const cognitoSignUp = async () => {
    const signUpResponse = await Auth.signUp({
      username: email,
      password,
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
        checkDuplicateUser: { __typename, message },
      },
    } = yield call(post, '/graphql', request);
    if (__typename === 'Error') {
      throw new Error(message);
    }

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
          email,
          id,
          username,
        }
      }
    `;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { createUser },
    } = yield call(post, '/graphql', graphql);
    yield put(incrementStep({ step: 2 }));
    yield put(signUpSuccess({ activeUser: createUser }));
  } catch (error) {
    yield put(signUpFailure({ error }));
  }
}

export function* verifyEmailSaga({ payload }) {
  const { userEmail, password, userId, verificationCode } = payload;

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
        transformUser( userId: "${userId}",
          userInput: {
            emailVerified: true,
          }
        ){
           __typename
          ... on User {
            id
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
    yield call(post, '/graphql', graphql);
    yield put(signIn({ password, username: userEmail }));
    yield put(verifyEmailSuccess());
  } catch (error) {
    yield put(verifyEmailFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ACTIVE_USER, fetchActiveUserSaga);
  yield takeLatest(FETCH_USER_SESSION, fetchUserSessionSaga);
  yield takeLatest(RESEND_SIGN_UP, resendSignUpSaga);
  yield takeLatest(SEARCH_ORGANIZATIONS, getUserOrganizationsSaga);
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
  yield takeLatest(SIGN_UP, signUpSaga);
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
}

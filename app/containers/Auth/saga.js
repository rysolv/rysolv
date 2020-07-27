import { call, put, takeLatest } from 'redux-saga/effects';
import Auth from '@aws-amplify/auth';
import { post } from 'utils/request';

import {
  FETCH_ACTIVE_USER,
  FETCH_USER_SESSION,
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
    yield call(cognitoSignOut);
    yield put(signInFailure({ error }));
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
          id,
          username,
          email
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

    yield put(signUpSuccess({ createUser }));
  } catch (error) {
    yield put(signUpFailure({ error }));
  }
}

export function* getUserOrganizationsSaga({ payload }) {
  const { id } = payload;
  const query = `
    query {
      getUserOrganizations(id: "${id}") {
        id,
        createdDate,
        modifiedDate,
        name,
        description,
        repoUrl,
        organizationUrl,
        issues,
        logo,
        verified,
        totalFunded,
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

export function* signOutSaga() {
  const cognitoSignOut = async () => {
    await Auth.signOut();
  };
  try {
    yield call(cognitoSignOut);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure());
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
        transformUser( id: "${userId}",
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

    yield put(signIn({ username: userEmail, password }));
  } catch (error) {
    yield put(verifyEmailFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ACTIVE_USER, fetchActiveUserSaga);
  yield takeLatest(FETCH_USER_SESSION, fetchUserSessionSaga);
  yield takeLatest(SEARCH_ORGANIZATIONS, getUserOrganizationsSaga);
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
  yield takeLatest(SIGN_UP, signUpSaga);
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import { post } from 'utils/request';
import { setCookie, clearCookie } from './helpers';

import {
  FETCH_ACTIVE_USER,
  SEARCH_ORGANIZATIONS,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from './constants';
import {
  fetchActiveUserFailure,
  fetchActiveUserSuccess,
  searchOrganizationsFailure,
  searchOrganizationsSuccess,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
} from './actions';

export function* fetchActiveUserSaga({ payload }) {
  const { userId } = payload;
  try {
    const query = `
    query{
      oneUser(id: "${userId}") {
        attempting,
        balance,
        id,
        issues,
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
    yield put(fetchActiveUserFailure({ error }));
  }
}

export function* signInSaga({ payload }) {
  const { username, password } = payload;

  const cognitoSignIn = async () => {
    const user = await Auth.signIn(username, password);
    return user;
  };

  try {
    const { username: userId } = yield call(cognitoSignIn);

    const query = `
    query{
      oneUser(id: "${userId}") {
        attempting,
        balance,
        id,
        issues,
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
    setCookie({ userId });
  } catch (error) {
    console.log(error.message);
    yield put(signInFailure({ error }));
  }
}

export function* signUpSaga({ payload }) {
  const { username, password } = payload;

  const cognitoSignUp = async () => {
    const signUpResponse = await Auth.signUp({
      username,
      password,
    });
    return signUpResponse;
  };

  try {
    const data = yield call(cognitoSignUp);
    console.log('signup: ', data);

    // CREATE USER WITH ID

    // const query = `
    // query{
    //   oneUser(id: "${userId}") {
    //     attempting,
    //     balance,
    //     id,
    //     issues,
    //     organizations,
    //     profilePic,
    //     pullRequests,
    //     rep,
    //     upvotes,
    //     username,
    //     watching,
    //   }
    // }`;
    // const graphql = JSON.stringify({
    //   query,
    //   variables: {},
    // });
    // const {
    //   data: { oneUser },
    // } = yield call(post, '/graphql', graphql);
    // yield put(signInSuccess({ oneUser }));
    // setCookie({ userId });
  } catch (error) {
    console.log(error.message);
    yield put(signInFailure({ error }));
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
  try {
    clearCookie('userId');
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ACTIVE_USER, fetchActiveUserSaga);
  yield takeLatest(SEARCH_ORGANIZATIONS, getUserOrganizationsSaga);
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
  yield takeLatest(SIGN_UP, signUpSaga);
}

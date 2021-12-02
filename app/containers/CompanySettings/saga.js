import { call, put, takeLatest } from 'redux-saga/effects';

import { signOut } from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  closeModalState,
  deleteUserFailure,
  deleteUserSuccess,
  editUserFailure,
  editUserSuccess,
  fetchUserFailure,
  fetchUserSuccess,
} from './actions';
import { DELETE_USER, EDIT_USER, FETCH_USER } from './constants';

export function* deleteUserSaga() {
  const query = `
    mutation{
      deleteUser {
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
        deleteUser: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(deleteUserSuccess());
    yield put(signOut());
  } catch (error) {
    yield put(closeModalState());
    yield put(deleteUserFailure({ error: { message: error } }));
  }
}

export function* editUserSaga({ payload }) {
  const { field, value } = payload;
  const query = `
    mutation {
      transformUser(userInput: {${field}: "${value}"}) {
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
    yield put(
      editUserSuccess({
        field,
        message,
        value,
      }),
    );
  } catch (error) {
    yield put(editUserFailure({ error: { message: error } }));
  }
}

export function* fetchUserSaga({ payload }) {
  const { userId } = payload;
  const query = `
    query {
      oneUser(userId: "${userId}") {
        __typename
        ... on User {
          email
          firstName
          lastName
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
        oneUser: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    yield put(fetchUserSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchUserFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(EDIT_USER, editUserSaga);
  yield takeLatest(FETCH_USER, fetchUserSaga);
}

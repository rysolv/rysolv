import { call, put, takeLatest } from 'redux-saga/effects';

import {
  successCreateUserMessage,
  successEditUserMessage,
} from 'responseMessage';
import { post } from 'utils/request';

import {
  DELETE_USER,
  FETCH_INFO,
  FETCH_USERS,
  SAVE_INFO,
  SEARCH_USERS,
  UPDATE_INFO,
} from './constants';
import {
  deleteUserFailure,
  deleteUserSuccess,
  fetchInfoFailure,
  fetchInfoSuccess,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchUsersFailure,
  searchUsersSuccess,
  updateInfoFailure,
  updateInfoSuccess,
} from './actions';

export function* deleteUserSaga({ payload }) {
  const { itemId } = payload;
  const query = `
  mutation{
    deleteUser(id: "${itemId}")
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { deleteUser },
    } = yield call(post, '/graphql', graphql);
    yield put(deleteUserSuccess({ itemId, message: deleteUser }));
  } catch (error) {
    yield put(deleteUserFailure({ error }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { itemId, username } = payload;
  const column = itemId ? 'id' : 'username';
  const value = itemId || username;
  const query = `
    query {
      oneUser(column: "${column}", query: "${value}") {
        id,
        createdDate,
        firstName,
        lastName,
        rep,
        profilePic,
        attempting,
        issuesNumber,
        username,
        githubLink,
        personalLink,
        preferredLanguages,
        stackoverflowLink,
      }
    }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { oneUser },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchInfoSuccess({ oneUser }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* fetchUsersSaga() {
  const query = `
    query {
      getUsers {
        id,
        createdDate,
        firstName,
        lastName,
        rep,
        profilePic,
        attempting,
        issuesNumber,
        username,
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { getUsers },
    } = yield call(post, '/graphql', graphql);
    yield put(fetchUsersSuccess({ getUsers }));
  } catch (error) {
    yield put(fetchUsersFailure({ error }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: {
      firstName,
      lastName,
      email,
      profilePic,
      githubLink,
      personalLink,
      preferredLanguages,
      stackoverflowLink,
      username,
    },
  } = payload;
  const query = `
  mutation{
    createUser(userInput: {
      firstName: "${firstName}",
      lastName: "${lastName}",
      email: "${email}",
      profilePic: "${profilePic}",
      githubLink: "${githubLink}",
      personalLink: "${personalLink}",
      preferredLanguages: "${preferredLanguages}",
      stackoverflowLink: "${stackoverflowLink}",
      username: "${username}",
    })
    { id }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(fetchUsers());
    yield put(saveInfoSuccess({ message: successCreateUserMessage }));
  } catch (error) {
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchUsersSaga({ payload }) {
  const { value } = payload;
  const query = `
  query {
    searchUsers(value: "${value}") {
      id,
      createdDate,
      firstName,
      lastName,
      rep,
      profilePic,
      attempting,
      issuesNumber,
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { searchUsers },
    } = yield call(post, '/graphql', graphql);
    yield put(searchUsersSuccess({ searchUsers }));
  } catch (error) {
    yield put(searchUsersFailure({ error }));
  }
}

export function* updateInfoSaga({ payload }) {
  const { editRequest, itemId } = payload;
  const {
    attempting,
    firstName,
    issuesNumber,
    lastName,
    profilePic,
    rep,
    username,
  } = editRequest;
  const query = `
    mutation {
      transformUser(id: "${itemId}", userInput: {
        attempting: ${JSON.stringify(attempting)},
        firstName: "${firstName}",
        issuesNumber: ${JSON.stringify(issuesNumber)},
        lastName: "${lastName}",
        profilePic: "${profilePic}",
        rep: ${parseInt(rep, 10)},
        username: "${username}",
      }) {
        id,
        createdDate,
        firstName,
        lastName,
        rep,
        profilePic,
        attempting,
        issuesNumber,
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(fetchUsers());
    yield put(updateInfoSuccess({ message: successEditUserMessage }));
  } catch (error) {
    yield put(updateInfoFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_USERS, searchUsersSaga);
  yield takeLatest(UPDATE_INFO, updateInfoSaga);
}

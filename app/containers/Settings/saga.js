import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  fetchActiveUser,
  signout,
  updateActiveUser,
} from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  DELETE_USER,
  FETCH_INFO,
  REMOVE_ISSUE,
  SAVE_CHANGE,
  SUBMIT_PAYMENT,
  WITHDRAW_FUNDS,
} from './constants';
import {
  deleteUserFailure,
  deleteUserSuccess,
  fetchInfo,
  fetchInfoFailure,
  fetchInfoSuccess,
  removeIssueFailure,
  removeIssueSuccess,
  saveChangeFailure,
  saveChangeSuccess,
  withdrawFundsFailure,
  withdrawFundsSuccess,
} from './actions';

export function* deleteUserSaga({ payload }) {
  const { userId } = payload;
  const query = `
  mutation{
    deleteUser(id: "${userId}")
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(deleteUserSuccess());
    yield put(signout());
    yield put(push('/issues'));
  } catch (error) {
    yield put(deleteUserFailure({ error }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { itemId } = payload;
  const query = `
    query {
      oneUser(column: "id", query: "${itemId}") {
        id,
        activePullRequests,
        attempting,
        balance,
        completedPullRequests,
        createdDate,
        dollarsEarned,
        email,
        firstName,
        githubLink,
        issues,
        lastName,
        organizations,
        personalLink,
        preferredLanguages,
        profilePic,
        rejectedPullRequests,
        rep,
        stackoverflowLink,
        username,
        watching,
      }
      getActivity(column: "user_id", id: "${itemId}") {
        __typename
        ... on ActivityArray {
          activityArray {
            activityId
            createdDate
            actionType
            issueId
            organizationId
            organizationName
            pullRequestId
            userId
            fundedValue
            issueName
            username
          }
        }
        ... on Error {
          message
        }
      }
    }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        oneUser,
        getActivity: { activityArray },
      },
    } = yield call(post, '/graphql', graphql);
    oneUser.activity = activityArray;
    yield put(fetchInfoSuccess({ oneUser }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* removeIssueSaga({ payload }) {
  const { id: issueId, userId, column, remove } = payload;
  const query = `
  mutation {
    updateIssueArray(id: "${issueId}", column: "${column}", data: "${userId}", remove: ${remove}) {
      id,
      attempting,
      watching
    }
    updateUserArray(id: "${userId}", column: "${column}", data: "${issueId}", remove: ${remove}) {
      attempting,
      watching
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(removeIssueSuccess({ column, issueId }));
    yield put(fetchActiveUser({ userId }));
  } catch (error) {
    yield put(removeIssueFailure({ error }));
  }
}

export function* saveChangeSaga({ payload }) {
  const { field, itemId, value } = payload;
  const formattedValue =
    field === 'preferredLanguages' ? JSON.stringify(value) : `"${value}"`;
  const query = `
    mutation {
      transformUser(id: "${itemId}", userInput: {
        ${field}: ${formattedValue},
      }) {
        id,
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
    yield call(post, '/graphql', graphql);
    yield put(fetchInfo({ itemId }));
    yield put(
      saveChangeSuccess({
        message: 'User account has been successfully updated.',
      }),
    );
  } catch (error) {
    yield put(saveChangeFailure({ error }));
  }
}

export function* submitPaymentSaga({ payload }) {
  try {
    console.log('Success', payload);
  } catch (error) {
    console.log('Error');
  }
}

export function* withdrawFundsSaga({ payload }) {
  const { transferValue, userId } = payload;
  const query = `
    mutation {
      createWithdrawal(transferValue: ${transferValue}, userId: "${userId}") {
        ... on Withdrawal {
          balance
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { createWithdrawal },
    } = yield call(post, '/graphql', graphql);
    const { balance } = createWithdrawal;
    yield put(updateActiveUser({ balance }));
    yield put(
      withdrawFundsSuccess({
        balance,
        message: 'Withdrawal request has been successfully submitted.',
      }),
    );
  } catch (error) {
    yield put(withdrawFundsFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(REMOVE_ISSUE, removeIssueSaga);
  yield takeLatest(SAVE_CHANGE, saveChangeSaga);
  yield takeLatest(SUBMIT_PAYMENT, submitPaymentSaga);
  yield takeLatest(WITHDRAW_FUNDS, withdrawFundsSaga);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import Auth from '@aws-amplify/auth';
import { push } from 'connected-react-router';

import {
  fetchActiveUser,
  signOut,
  updateActiveUser,
} from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  CHANGE_EMAIL,
  DELETE_USER,
  FETCH_INFO,
  PAYPAL_PAYMENT,
  REMOVE_ISSUE,
  REMOVE_WATCHING,
  SAVE_CHANGE,
  STRIPE_TOKEN,
  WITHDRAW_FUNDS,
} from './constants';
import {
  changeEmailFailure,
  changeEmailSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  fetchInfoFailure,
  fetchInfoSuccess,
  paypalPaymentFailure,
  paypalPaymentSuccess,
  removeIssueFailure,
  removeIssueSuccess,
  saveChange,
  saveChangeFailure,
  saveChangeSuccess,
  stripeTokenFailure,
  stripeTokenSuccess,
  withdrawFundsFailure,
  withdrawFundsSuccess,
} from './actions';

export function* changeEmailSaga({ payload }) {
  const { email, id } = payload;
  try {
    const changeCognitoEmail = async () => {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email });
    };
    yield call(changeCognitoEmail);
    yield put(changeEmailSuccess());
    yield put(saveChange({ field: 'email', id, value: email }));
  } catch (error) {
    yield put(changeEmailFailure({ error }));
  }
}

export function* deleteUserSaga({ payload }) {
  const { userId } = payload;
  const query = `
  mutation{
    deleteUser(userId: "${userId}")
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    yield call(post, '/graphql', graphql);
    yield put(deleteUserSuccess());
    yield put(signOut());
    yield put(push('/issues'));
  } catch (error) {
    yield put(deleteUserFailure({ error }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { userId } = payload;
  const query = `
    query {
      oneUser(id: "${userId}") {
        activePullRequests,
        attempting,
        balance,
        completedPullRequests,
        createdDate,
        dollarsEarned,
        email,
        firstName,
        githubLink,
        id,
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
      getUserActivity(userId: "${userId}") {
        __typename
        ... on ActivityArray {
          activityArray {
            activityId,
            createdDate,
            actionType,
            issueId,
            organizationId,
            organizationName,
            pullRequestId,
            userId,
            fundedValue,
            issueName,
            username,
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
        getUserActivity: { activityArray },
        oneUser,
      },
    } = yield call(post, '/graphql', graphql);
    oneUser.activity = activityArray;
    yield put(fetchInfoSuccess({ oneUser }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* paypalPaymentSaga({ payload }) {
  try {
    const { amount, error, userId } = payload;
    if (error) {
      throw new Error(error);
    }
    const query = `
    mutation {
      createPaypalPayment(amount: ${amount}, userId: "${userId}") {
        __typename
        ... on Payment {
          balance,
          message,
        }
        ... on Error {
          message
        }
      }
    }
  `;
    const request = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        createPaypalPayment: { __typename, balance, message },
      },
    } = yield call(post, '/graphql', request);
    if (__typename === 'Error') throw message;
    yield put(paypalPaymentSuccess({ balance, message }));
    yield put(updateActiveUser({ balance }));
  } catch (error) {
    yield put(paypalPaymentFailure({ error }));
  }
}

export function* removeIssueSaga({ payload }) {
  const { column, id: issueId, remove, userId } = payload;
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

export function* removeWatchingSaga({ payload }) {
  const { id: issueId, userId } = payload;
  const query = `
  mutation {
    toggleWatching(issueId: "${issueId}", userId: "${userId}") {
      __typename
      ... on WatchListArray {
        issueArray {
          fundedAmount
          id
          name
        }
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        toggleWatching: { __typename, issueArray, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw new Error(message);
    }
    yield put(removeIssueSuccess({ column: 'watching', issueId }));
    yield put(updateActiveUser({ watching: issueArray }));
  } catch (error) {
    yield put(removeIssueFailure({ error }));
  }
}

export function* saveChangeSaga({ payload }) {
  const { field, userId, value } = payload;
  const formattedValue =
    field === 'preferredLanguages' ? JSON.stringify(value) : `"${value}"`;
  const query = `
    mutation {
      transformUser(userId: "${userId}", userInput: {
        ${field}: ${formattedValue},
      }) {
      __typename
      ... on User {
        githubLink,
        id,
        personalLink,
        preferredLanguages,
        stackoverflowLink,
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        transformUser,
        transformUser: { __typename },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw new Error(transformUser.message);
    }
    yield put(
      saveChangeSuccess({
        field,
        message: 'User account has been successfully updated.',
        value,
      }),
    );
    if (field === 'profilePic') {
      yield put(updateActiveUser({ profilePic: value }));
    }
  } catch (error) {
    yield put(saveChangeFailure({ error }));
  }
}

export function* stripeTokenSaga({ payload }) {
  try {
    const {
      amount,
      token: { id },
      userId,
    } = payload;
    const query = `
    mutation {
      createStripeCharge(
        amount: ${amount},
        token: "${id}",
        userId: "${userId}"
      ) {
        __typename
        ... on Payment {
          balance,
          message,
        }
        ... on Error {
          message
        }
      }
    }
  `;
    const request = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        createStripeCharge: { __typename, balance, message },
      },
    } = yield call(post, '/graphql', request);
    if (__typename === 'Error') throw message;
    yield put(stripeTokenSuccess({ balance, message }));
    yield put(updateActiveUser({ balance }));
  } catch (error) {
    yield put(stripeTokenFailure({ error }));
  }
}

export function* withdrawFundsSaga({ payload }) {
  const { transferValue, userId } = payload;
  const query = `
    mutation {
      createWithdrawal(transferValue: ${transferValue}, userId: "${userId}") {
        __typename
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
    const { balance, message, __typename } = createWithdrawal;
    if (__typename === 'Error') {
      throw new Error(message);
    }
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
  yield takeLatest(CHANGE_EMAIL, changeEmailSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(PAYPAL_PAYMENT, paypalPaymentSaga);
  yield takeLatest(REMOVE_WATCHING, removeWatchingSaga);
  yield takeLatest(REMOVE_ISSUE, removeIssueSaga);
  yield takeLatest(SAVE_CHANGE, saveChangeSaga);
  yield takeLatest(STRIPE_TOKEN, stripeTokenSaga);
  yield takeLatest(WITHDRAW_FUNDS, withdrawFundsSaga);
}

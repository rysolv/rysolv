import { call, put, takeLatest } from 'redux-saga/effects';
import Auth from '@aws-amplify/auth';
import { push } from 'connected-react-router';

import { signOut, updateActiveUser } from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  CHANGE_EMAIL,
  DELETE_USER,
  FETCH_INFO,
  PAYPAL_PAYMENT,
  REMOVE_ATTEMPTING,
  REMOVE_WATCHING,
  SAVE_CHANGE,
  STRIPE_TOKEN,
  VERIFY_ACCOUNT,
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
  verifyAccountFailure,
  verifyAccountSuccess,
  withdrawFundsFailure,
  withdrawFundsSuccess,
} from './actions';

export function* changeEmailSaga({ payload }) {
  const { email, userId } = payload;
  try {
    const changeCognitoEmail = async () => {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email });
    };
    yield call(changeCognitoEmail);
    yield put(changeEmailSuccess());
    yield put(saveChange({ field: 'email', userId, value: email }));
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
        githubUsername,
        id,
        isGithubVerified,
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
        actionType,
        activityId,
        createdDate,
        fundedValue,
        issueId,
        issueName,
        organizationId,
        organizationName,
        pullRequestId,
        userId,
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
      data: { getUserActivity, oneUser },
    } = yield call(post, '/graphql', graphql);
    oneUser.activity = getUserActivity;
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
          balance
          message
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
    if (__typename === 'Error') {
      throw message;
    }
    yield put(paypalPaymentSuccess({ balance, message }));
    yield put(updateActiveUser({ balance }));
  } catch (error) {
    yield put(paypalPaymentFailure({ error: { message: error } }));
  }
}

export function* removeAttemptingSaga({ payload }) {
  const { issueId, userId } = payload;
  const query = `
  mutation {
    toggleAttempting(issueId: "${issueId}", userId: "${userId}") {
      __typename
      ... on AttemptingArray {
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
        toggleAttempting: { __typename, issueArray, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(removeIssueSuccess({ column: 'attempting', issueId }));
    yield put(updateActiveUser({ attempting: issueArray }));
  } catch (error) {
    yield put(removeIssueFailure({ error: { message: error } }));
  }
}

export function* removeWatchingSaga({ payload }) {
  const { issueId, userId } = payload;
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
    yield put(stripeTokenFailure({ error: { message: error } }));
  }
}

export function* verifyAccountSaga({ payload }) {
  const { code, userId } = payload;
  const query = `
    query {
      verifyUserAccount(code: "${code}", userId: "${userId}") {
        __typename
        ... on Verification {
          githubUsername
          isGithubVerified
          message
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
      data: { verifyUserAccount },
    } = yield call(post, '/graphql', graphql);
    const {
      __typename,
      githubUsername,
      isGithubVerified,
      message,
    } = verifyUserAccount;
    if (__typename === 'Error') {
      throw new Error(message);
    }
    yield put(verifyAccountSuccess({ githubUsername, message }));
    yield put(updateActiveUser({ isGithubVerified }));
  } catch (error) {
    yield put(verifyAccountFailure({ error }));
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
          message
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
        createWithdrawal: { __typename, balance, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') {
      throw message;
    }
    yield put(updateActiveUser({ balance }));
    yield put(
      withdrawFundsSuccess({
        balance,
        message,
      }),
    );
  } catch (error) {
    yield put(withdrawFundsFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(CHANGE_EMAIL, changeEmailSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(PAYPAL_PAYMENT, paypalPaymentSaga);
  yield takeLatest(REMOVE_ATTEMPTING, removeAttemptingSaga);
  yield takeLatest(REMOVE_WATCHING, removeWatchingSaga);
  yield takeLatest(SAVE_CHANGE, saveChangeSaga);
  yield takeLatest(STRIPE_TOKEN, stripeTokenSaga);
  yield takeLatest(VERIFY_ACCOUNT, verifyAccountSaga);
  yield takeLatest(WITHDRAW_FUNDS, withdrawFundsSaga);
}

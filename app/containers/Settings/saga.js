import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { signOut, updateActiveUser } from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  CHANGE_EMAIL,
  changeEmailError,
  DELETE_USER,
  FETCH_INFO,
  PAYPAL_PAYMENT,
  REMOVE_ATTEMPTING,
  REMOVE_WATCHING,
  SAVE_CHANGE,
  STRIPE_TOKEN,
  VERIFY_ACCOUNT,
  verifyUserAccountError,
  WITHDRAW_FUNDS,
} from './constants';
import {
  changeEmailFailure,
  changeEmailSuccess,
  closeModalState,
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
  const { email } = payload;
  try {
    yield put(saveChange({ field: 'email', value: email }));
    yield put(changeEmailSuccess());
  } catch (error) {
    const { message } = error;
    const messageToRender = message || changeEmailError;
    yield put(changeEmailFailure({ error: { message: messageToRender } }));
  }
}

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
    yield put(push('/issues'));
    yield put(signOut());
  } catch (error) {
    yield put(closeModalState());
    yield put(deleteUserFailure({ error: { message: error } }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { userId } = payload;
  const query = `
    query {
      getUserSettings {
        __typename
        ... on User {
          activePullRequests
          attempting
          balance
          completedPullRequests
          createdDate
          dollarsEarned
          email
          firstName
          githubLink
          githubUsername
          id
          isGithubVerified
          issues
          lastName
          personalLink
          preferredLanguages
          profilePic
          rejectedPullRequests
          rep
          repos
          stackoverflowLink
          username
          watching
        }
        ... on Error {
          message
        }
      }
      getUserActivity(userId: "${userId}") {
        actionType
        activityId
        createdDate
        fundedValue
        issueId
        issueName
        organizationId
        organizationName
        pullRequestId
        pullRequestName
        pullRequestUrl
        userId
        username
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getUserActivity,
        getUserSettings: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    restProps.activity = getUserActivity;
    yield put(fetchInfoSuccess({ user: restProps }));
  } catch (error) {
    yield put(fetchInfoFailure({ error: { message: error } }));
  }
}

export function* paypalPaymentSaga({ payload }) {
  const { amount, error: paypalError } = payload;
  const query = `
    mutation {
      createPaypalPayment(amount: ${amount}) {
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
  try {
    if (paypalError) throw paypalError;

    const graphql = JSON.stringify({ query });
    const {
      data: {
        createPaypalPayment: { __typename, balance, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(paypalPaymentSuccess({ balance, message }));
    yield put(updateActiveUser({ balance }));
  } catch (error) {
    yield put(paypalPaymentFailure({ error: { message: error } }));
  }
}

export function* removeAttemptingSaga({ payload }) {
  const { issueId } = payload;
  const query = `
    mutation {
      toggleAttempting(issueId: "${issueId}") {
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
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        toggleAttempting: { __typename, issueArray, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(removeIssueSuccess({ column: 'attempting', issueId }));
    yield put(updateActiveUser({ attempting: issueArray }));
  } catch (error) {
    yield put(removeIssueFailure({ error: { message: error } }));
  }
}

export function* removeWatchingSaga({ payload }) {
  const { issueId } = payload;
  const query = `
    mutation {
      toggleWatching(issueId: "${issueId}") {
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
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        toggleWatching: { __typename, issueArray, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(removeIssueSuccess({ column: 'watching', issueId }));
    yield put(updateActiveUser({ watching: issueArray }));
  } catch (error) {
    yield put(removeIssueFailure({ error: { message: error } }));
  }
}

export function* saveChangeSaga({ payload }) {
  const { field, value } = payload;
  const formattedValue =
    field === 'preferredLanguages' ? JSON.stringify(value) : `"${value}"`;
  const query = `
    mutation {
      transformUser(userInput: { ${field}: ${formattedValue} }) {
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
      saveChangeSuccess({
        field,
        message,
        value,
      }),
    );
    if (field === 'profilePic') {
      yield put(updateActiveUser({ profilePic: value }));
    }
  } catch (error) {
    yield put(saveChangeFailure({ error: { message: error } }));
  }
}

export function* stripeTokenSaga({ payload }) {
  const {
    amount,
    token: { id },
  } = payload;
  const query = `
    mutation {
      createStripeCharge(amount: ${amount}, token: "${id}")
      {
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
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        createStripeCharge: { __typename, balance, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(stripeTokenSuccess({ balance, message }));
    yield put(updateActiveUser({ balance }));
  } catch (error) {
    yield put(stripeTokenFailure({ error: { message: error } }));
  }
}

export function* verifyAccountSaga({ payload }) {
  const { code } = payload;
  const query = `
    mutation {
      verifyUserAccount(code: "${code}") {
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        verifyUserAccount: { __typename, isGithubVerified, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    yield put(push('/settings'));
    yield put(updateActiveUser({ isGithubVerified }));
    yield put(verifyAccountSuccess({ message }));
  } catch (error) {
    const { message } = error;
    const messageToRender = message || verifyUserAccountError;
    yield put(push('/settings'));
    yield put(verifyAccountFailure({ error: { message: messageToRender } }));
  }
}

export function* withdrawFundsSaga({ payload }) {
  const { email, transferValue } = payload;
  const query = `
    mutation {
      createWithdrawal(email: "${email}", transferValue: ${transferValue}) {
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        createWithdrawal: { __typename, balance, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
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

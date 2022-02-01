import { call, put, takeLatest } from 'redux-saga/effects';

import { updateActiveUser } from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  fetchMessagesFailure,
  fetchMessagesSuccess,
  sendMessageFailure,
  sendMessageSuccess,
  setReadReceiptFailure,
  setReadReceiptSuccess,
} from './actions';
import { FETCH_MESSAGES, SEND_MESSAGE, SET_READ_RECEIPT } from './constants';

export function* fetchMessagesSaga() {
  const query = `
      query {
        getMessages {
          __typename
          ... on ConversationArray {
            conversations {
              candidate
              company
              lastMessageDate
              messages
              position
              threadId
              toUserId
              unread
            }
          }
          ...on Error {
            message
          }
        }
      }
    `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getMessages: { __typename, message, conversations },
      },
    } = yield call(post, '/graphql', graphql);

    if (__typename === 'Error') throw message;
    yield put(fetchMessagesSuccess({ conversations }));
  } catch (error) {
    yield put(fetchMessagesFailure({ error: { message: error } }));
  }
}

export function* sendMessageSaga({ payload }) {
  const { body, positionId, candidateId, threadId } = payload;
  const query = `
    mutation{
      createMessage(messageInput: {
        body: ${JSON.stringify(body)}
        positionId: "${positionId}"
        threadId: "${threadId}"
        toUserId: "${candidateId}"
      }) {
        __typename
        ... on MessageResponse {
          body
          createdDate
          firstName
          id
          lastName
          profilePic
          readDate
          username
          userId
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
        createMessage: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(sendMessageSuccess({ newMessage: restProps, threadId }));
  } catch (error) {
    yield put(sendMessageFailure({ error: { message: error } }));
  }
}

export function* setReadReceiptSaga({ payload }) {
  const { threadId } = payload;
  const query = `
    mutation{
      setReadMessage(threadId: "${threadId}")
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
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        setReadMessage: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;

    yield put(setReadReceiptSuccess({ threadId }));
    yield put(updateActiveUser({ threadId }));
  } catch (error) {
    yield put(setReadReceiptFailure({ error: { message: error } }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_MESSAGES, fetchMessagesSaga);
  yield takeLatest(SEND_MESSAGE, sendMessageSaga);
  yield takeLatest(SET_READ_RECEIPT, setReadReceiptSaga);
}

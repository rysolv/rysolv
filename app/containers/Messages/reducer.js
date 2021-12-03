/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE,
  SET_READ_RECEIPT_FAILURE,
  SET_READ_RECEIPT_SUCCESS,
  SET_READ_RECEIPT,
} from './constants';

export const initialState = {
  conversations: [],
  error: null,
  loading: true,
  messageLoading: true,
};

const messagesReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_MESSAGES_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_MESSAGES_SUCCESS: {
      const { conversations } = payload;
      draft.loading = false;
      draft.conversations = conversations;
      break;
    }
    case FETCH_MESSAGES: {
      draft.error = null;
      draft.loading = true;
      break;
    }
    case SEND_MESSAGE_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.messageLoading = false;
      break;
    }
    case SEND_MESSAGE_SUCCESS: {
      const { newMessage, threadId } = payload;
      draft.conversations.forEach((el, i) => {
        if (threadId === el.threadId) {
          draft.conversations[i].messages.push(newMessage);
        }
      });
      draft.messageLoading = false;
      break;
    }
    case SEND_MESSAGE: {
      draft.error = null;
      draft.messageLoading = true;
      break;
    }
    case SET_READ_RECEIPT_FAILURE: {
      const { error } = payload;
      draft.error = error;
      break;
    }
    case SET_READ_RECEIPT_SUCCESS: {
      const { threadId } = payload;
      draft.conversations.forEach((el, i) => {
        if (threadId === el.threadId) {
          draft.conversations[i].unread = false;
        }
      });
      draft.messageLoading = false;
      break;
    }
    case SET_READ_RECEIPT: {
      draft.error = null;
      break;
    }
  }
}, initialState);

export default messagesReducer;

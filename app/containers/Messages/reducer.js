/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES,
  RESET_MARKDOWN,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE,
  SET_READ_RECEIPT_FAILURE,
  SET_READ_RECEIPT_SUCCESS,
  SET_READ_RECEIPT,
} from './constants';

export const initialState = {
  conversations: [],
  error: {
    main: false,
    message: false,
  },
  loading: {
    main: true,
    message: false,
  },
  success: false,
};

const messagesReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_MESSAGES_FAILURE: {
      const { error } = payload;
      draft.error.main = error;
      draft.loading.main = false;
      break;
    }
    case FETCH_MESSAGES_SUCCESS: {
      const { conversations } = payload;
      draft.loading.main = false;
      draft.conversations = conversations;
      break;
    }
    case FETCH_MESSAGES: {
      draft.error.main = false;
      draft.loading.main = true;
      break;
    }
    case RESET_MARKDOWN: {
      draft.error.message = initialState.error.message;
      draft.success = initialState.success;
      break;
    }
    case SEND_MESSAGE_FAILURE: {
      draft.error.message = true;
      draft.loading.message = false;
      break;
    }
    case SEND_MESSAGE_SUCCESS: {
      const { newMessage, threadId } = payload;
      draft.conversations.forEach((el, i) => {
        if (threadId === el.threadId) {
          draft.conversations[i].messages.push(newMessage);
        }
      });
      draft.loading.message = false;
      draft.success = true;
      break;
    }
    case SEND_MESSAGE: {
      draft.error.message = initialState.error.message;
      draft.loading.message = true;
      draft.success = initialState.sucess;
      break;
    }
    case SET_READ_RECEIPT_FAILURE: {
      const { error } = payload;
      draft.error.main = error;
      break;
    }
    case SET_READ_RECEIPT_SUCCESS: {
      const { threadId } = payload;
      draft.conversations.forEach((el, i) => {
        if (threadId === el.threadId) {
          draft.conversations[i].unread = false;
        }
      });
      break;
    }
    case SET_READ_RECEIPT: {
      draft.error.main = false;
      break;
    }
  }
}, initialState);

export default messagesReducer;

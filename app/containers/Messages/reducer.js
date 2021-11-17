/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE,
} from './constants';

export const initialState = {
  error: null,
  loading: true,
  conversations: [],
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
      draft.loading = false;
      break;
    }
    case SEND_MESSAGE_SUCCESS: {
      const { message } = payload;
      console.log('SEND_MESSAGE_SUCCESS');
      console.log(message);
      draft.loading = false;
      break;
    }
    case SEND_MESSAGE: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default messagesReducer;

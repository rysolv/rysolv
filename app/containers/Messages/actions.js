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

export function fetchMessagesFailure(payload) {
  return {
    payload,
    type: FETCH_MESSAGES_FAILURE,
  };
}

export function fetchMessagesSuccess(payload) {
  return {
    payload,
    type: FETCH_MESSAGES_SUCCESS,
  };
}

export function fetchMessages() {
  return {
    type: FETCH_MESSAGES,
  };
}

export function sendMessageFailure(payload) {
  return {
    payload,
    type: SEND_MESSAGE_FAILURE,
  };
}

export function sendMessageSuccess(payload) {
  return {
    payload,
    type: SEND_MESSAGE_SUCCESS,
  };
}

export function sendMessage(payload) {
  return {
    payload,
    type: SEND_MESSAGE,
  };
}

export function setReadReceiptFailure(payload) {
  return {
    payload,
    type: SET_READ_RECEIPT_FAILURE,
  };
}

export function setReadReceiptSuccess(payload) {
  return {
    payload,
    type: SET_READ_RECEIPT_SUCCESS,
  };
}

export function setReadReceipt(payload) {
  return {
    payload,
    type: SET_READ_RECEIPT,
  };
}

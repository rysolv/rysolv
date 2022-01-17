import {
  FETCH_POSITION_DETAIL_FAILURE,
  FETCH_POSITION_DETAIL_SUCCESS,
  FETCH_POSITION_DETAIL,
} from './constants';

export function fetchPositionDetailFailure(payload) {
  return {
    payload,
    type: FETCH_POSITION_DETAIL_FAILURE,
  };
}

export function fetchPositionDetailSuccess(payload) {
  return {
    payload,
    type: FETCH_POSITION_DETAIL_SUCCESS,
  };
}

export function fetchPositionDetail(payload) {
  return {
    payload,
    type: FETCH_POSITION_DETAIL,
  };
}

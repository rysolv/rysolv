import {
  CHANGE_INPUT,
  CHANGE_VIEW,
  SUBMIT_JOB_INFO_FAILURE,
  SUBMIT_JOB_INFO_SUCCESS,
  SUBMIT_JOB_INFO,
} from './constants';

export function changeInput(payload) {
  return {
    payload,
    type: CHANGE_INPUT,
  };
}

export function changeView(payload) {
  return {
    payload,
    type: CHANGE_VIEW,
  };
}

export function submitJobInfoFailure(payload) {
  return {
    payload,
    type: SUBMIT_JOB_INFO_FAILURE,
  };
}

export function submitJobInfoSuccess() {
  return { type: SUBMIT_JOB_INFO_SUCCESS };
}

export function submitJobInfo(payload) {
  return {
    payload,
    type: SUBMIT_JOB_INFO,
  };
}

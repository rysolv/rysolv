import {
  FETCH_ORGANIZATION_OPTIONS_FAILURE,
  FETCH_ORGANIZATION_OPTIONS_SUCCESS,
  FETCH_ORGANIZATION_OPTIONS,
  RESET_STATE,
} from './constants';

export function fetchOrganizationOptionsFailure(payload) {
  return {
    payload,
    type: FETCH_ORGANIZATION_OPTIONS_FAILURE,
  };
}

export function fetchOrganizationOptionsSuccess(payload) {
  return {
    payload,
    type: FETCH_ORGANIZATION_OPTIONS_SUCCESS,
  };
}

export function fetchOrganizationOptions() {
  return {
    type: FETCH_ORGANIZATION_OPTIONS,
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}

import produce from 'immer';

import {
  FETCH_ACTIVE_USER,
  FETCH_ACTIVE_USER_FAILURE,
  FETCH_ACTIVE_USER_SUCCESS,
  UPDATE_ACTIVE_USER,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  activeUser: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_ACTIVE_USER: {
      draft.loading = true;
      break;
    }
    case FETCH_ACTIVE_USER_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_ACTIVE_USER_SUCCESS: {
      const { oneUser } = payload;
      draft.activeUser = oneUser;
      draft.loading = false;
      break;
    }
    case UPDATE_ACTIVE_USER: {
      const { attempting } = payload;
      draft.activeUser.attempting = attempting;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default authReducer;

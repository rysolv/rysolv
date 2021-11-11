/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  FETCH_USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE,
} from './constants';

export const initialState = {
  error: null,
  loading: true,
  user: {},
};

const userProfileReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_USER_PROFILE_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_USER_PROFILE_SUCCESS: {
      const { user } = payload;
      draft.loading = false;
      draft.user = user;
      break;
    }
    case FETCH_USER_PROFILE: {
      draft.error = null;
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default userProfileReducer;

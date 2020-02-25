import produce from 'immer';
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS,
} from './constants';

export const initialState = {
  users: [],
  loading: {
    users: false,
  },
  error: {
    users: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_USERS_FAILURE: {
      const { error } = payload;
      draft.error.users = error;
      draft.loading.users = false;
      break;
    }
    case FETCH_USERS_SUCCESS: {
      const { users } = payload;
      draft.users = users;
      draft.loading.users = false;
      break;
    }
    case FETCH_USERS: {
      draft.loading.users = true;
      break;
    }
  }
}, initialState);

export default usersReducer;

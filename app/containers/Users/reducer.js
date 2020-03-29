import produce from 'immer';
import remove from 'lodash/remove';

import {
  CLEAR_ALERTS,
  CLEAR_FORM,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS,
  INCREMENT_STEP,
  INPUT_CHANGE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_USERS_FAILURE,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS,
  UPDATE_INFO_FAILURE,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO,
  VERIFY_INFO,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  data: {
    email: { error: '', value: '' },
    firstName: { error: '', value: '' },
    githubLink: { error: '', value: '' },
    image: { error: '', value: '' },
    lastName: { error: '', value: '' },
    personalLink: { error: '', value: '' },
    preferredLanguages: { error: '', value: '' },
    stackoverflowLink: { error: '', value: '' },
    userName: { error: '', value: '' },
  },
  editInfo: {
    activeNumber: { error: '', value: '' },
    id: { error: '', value: '' },
    image: { error: '', value: '' },
    issuesNumber: { error: '', value: '' },
    joinDate: { error: '', value: '' },
    name: { error: '', value: '' },
    pointsNumber: { error: '', value: '' },
    userName: { error: '', value: '' },
  },
  error: {
    editUser: false,
    searchUsers: false,
    users: false,
  },
  isVerified: false,
  loading: {
    addUser: false,
    deleteUser: false,
    editUser: false,
    searchUsers: false,
    updateUser: false,
    users: false,
  },
  search: {
    name: { error: '', value: '' },
  },
  step: {
    addUser: 1,
    editUser: 1,
  },
  users: [],
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case CLEAR_FORM: {
      draft.data = initialState.data;
      draft.isVerified = initialState.isVerified;
      break;
    }
    case DELETE_USER_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deleteUser = false;
      break;
    }
    case DELETE_USER_SUCCESS: {
      const { message, userId } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteUser = false;
      remove(draft.users, ({ id }) => id === userId);
      break;
    }
    case DELETE_USER: {
      draft.loading.deleteUser = true;
      break;
    }
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error.editUser = error;
      draft.loading.editUser = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { user } = payload;
      Object.keys(user).forEach(detail => {
        draft.editInfo[detail].value = user[detail];
      });
      draft.loading.editUser = false;
      break;
    }
    case FETCH_INFO: {
      draft.loading.editUser = true;
      break;
    }
    case FETCH_USERS_FAILURE: {
      const { error } = payload;
      draft.error.users = error;
      draft.loading.users = false;
      break;
    }
    case FETCH_USERS_SUCCESS: {
      const { getUsers } = payload;
      draft.users = getUsers;
      draft.loading.users = false;
      break;
    }
    case FETCH_USERS: {
      draft.loading.users = true;
      break;
    }
    case INCREMENT_STEP: {
      const { step, view } = payload;
      draft.step[view] = step;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft[form][field].value = value;
      break;
    }
    case SAVE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.addUser = false;
      break;
    }
    case SAVE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.addUser = false;
      break;
    }
    case SAVE_INFO: {
      draft.loading.addUser = true;
      break;
    }
    case SEARCH_USERS_FAILURE: {
      const { error } = payload;
      draft.error.searchUsers = error;
      draft.loading.searchUsers = false;
      break;
    }
    case SEARCH_USERS_SUCCESS: {
      const { users } = payload;
      draft.users = users || null;
      draft.loading.searchUsers = false;
      break;
    }
    case SEARCH_USERS: {
      draft.loading.searchUsers = true;
      break;
    }
    case UPDATE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.updateUser = false;
      break;
    }
    case UPDATE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.updateUser = false;
      break;
    }
    case UPDATE_INFO: {
      draft.loading.updateUser = true;
      break;
    }
    case VERIFY_INFO: {
      draft.isVerified = !draft.isVerified;
      break;
    }
  }
}, initialState);

export default usersReducer;

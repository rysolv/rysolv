import produce from 'immer';
import remove from 'lodash/remove';

import {
  CHANGE_USER_FILTER,
  CHANGE_USER_SEARCH,
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
    profilePic: { error: '', value: '' },
    lastName: { error: '', value: '' },
    personalLink: { error: '', value: '' },
    preferredLanguages: { error: '', value: [] },
    stackoverflowLink: { error: '', value: '' },
    username: { error: '', value: '' },
  },
  editInfo: {
    attempting: { error: '', value: [] },
    createdDate: { error: '', value: '' },
    firstName: { error: '', value: '' },
    id: { error: '', value: '' },
    issues: { error: '', value: [] },
    lastName: { error: '', value: '' },
    profilePic: { error: '', value: '' },
    rep: { error: '', value: '' },
    username: { error: '', value: '' },
  },
  error: {
    fetchUser: false,
    searchUsers: false,
    users: false,
  },
  filter: {
    language: [],
    overview: 'Newest',
    users: 'All',
  },
  isVerified: false,
  loading: {
    addUser: false,
    deleteUser: false,
    fetchUser: false,
    searchUsers: false,
    updateUser: false,
    users: false,
  },
  search: {
    overviewInput: { error: '', value: '' },
    searchInput: { error: '', value: '' },
  },
  step: {
    addUser: 1,
    editUser: 1,
  },
  users: [],
  user: {},
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_USER_FILTER: {
      const { field, value } = payload;
      if (field === 'language') {
        draft.filter[field] = [];
        value.map(language => draft.filter[field].push(language));
      } else {
        draft.filter[field] = value;
      }
      break;
    }
    case CHANGE_USER_SEARCH: {
      const { field, value } = payload;
      draft.search[field].value = value;
      break;
    }
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      draft.filter = initialState.filter;
      draft.search = initialState.search;
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
      const { itemId, message } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteUser = false;
      remove(draft.users, ({ id }) => id === itemId);
      break;
    }
    case DELETE_USER: {
      draft.loading.deleteUser = true;
      break;
    }
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error.fetchUser = error;
      draft.loading.fetchUser = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { oneUser } = payload;
      Object.keys(oneUser).forEach(detail => {
        if (draft.editInfo[detail]) {
          draft.editInfo[detail].value = oneUser[detail];
        }
      });
      draft.loading.fetchUser = false;
      draft.user = oneUser;
      break;
    }
    case FETCH_INFO: {
      draft.loading.fetchUser = true;
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
      if (form === 'filter') {
        draft[form][field] = value;
      } else if (field === 'preferredLanguages') {
        draft[form][field].value = [];
        value.map(language => draft[form][field].value.push(language.value));
      } else {
        draft[form][field].value = value;
      }
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
      const { searchUsers } = payload;
      draft.users = searchUsers;
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

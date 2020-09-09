import produce from 'immer';

import {
  CHANGE_USER_FILTER,
  CHANGE_USER_SEARCH,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS,
  INPUT_CHANGE,
  SEARCH_USERS_FAILURE,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS,
} from './constants';

export const initialState = {
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
  loading: {
    fetchUser: false,
    searchUsers: false,
    users: false,
  },
  search: {
    overviewInput: { error: '', value: '' },
    searchInput: { error: '', value: '' },
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
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error.fetchUser = error;
      draft.loading.fetchUser = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { oneUser } = payload;
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
  }
}, initialState);

export default usersReducer;

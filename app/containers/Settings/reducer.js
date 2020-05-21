import produce from 'immer';

import {
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  INPUT_CHANGE,
} from './constants';

export const initialState = {
  account: {},
  currentTab: 0,
  error: false,
  filter: {
    language: [],
    overview: 'Newest',
    users: 'All',
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error = error;
      draft.loading = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { oneUser } = payload;
      draft.loading = false;
      draft.account = oneUser;
      break;
    }
    case FETCH_INFO: {
      draft.error = false;
      draft.loading = true;
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
  }
}, initialState);

export default settingsReducer;

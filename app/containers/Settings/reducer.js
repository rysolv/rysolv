import produce from 'immer';

import {
  CLEAR_ALERTS,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  INPUT_CHANGE,
  SAVE_CHANGE_FAILURE,
  SAVE_CHANGE_SUCCESS,
  SAVE_CHANGE,
} from './constants';

export const initialState = {
  account: {},
  alerts: { error: false, success: false },
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
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
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
    case SAVE_CHANGE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading = false;
      break;
    }
    case SAVE_CHANGE_SUCCESS: {
      const { message } = payload;
      draft.loading = false;
      draft.alerts.success = { message };
      break;
    }
    case SAVE_CHANGE: {
      draft.loading = true;
      break;
    }
  }
}, initialState);

export default settingsReducer;

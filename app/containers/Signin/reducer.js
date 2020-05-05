/* eslint-disable array-callback-return */
import produce from 'immer';
import { INPUT_CHANGE, INPUT_ERROR } from './constants';

export const initialState = {
  alerts: { error: false, success: false },

  data: {
    email: { error: '', value: '' },
    password: { error: '', value: '' },
  },
};

/* eslint-disable default-case, no-param-reassign */
const organizationsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      draft[form][field].value = value;
      break;
    }
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.data[field].error = errors[field] || '';
      });
      break;
    }
  }
}, initialState);

export default organizationsReducer;

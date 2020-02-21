import produce from 'immer';
import { TEST } from './constants';

export const initialState = { test: true };

/* eslint-disable default-case, no-param-reassign */
const mainReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case TEST: {
      const { result } = payload;
      draft.test = result || false;
      break;
    }
  }
}, initialState);

export default mainReducer;

/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import { SELECT_POSITION } from './constants';

export const initialState = {
  candidates: [],
  error: false,
  loading: false,
  selectedPosition: '',
};

const companyDashboardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case SELECT_POSITION: {
      const { position } = payload;
      draft.selectedPosition = position;
      break;
    }
  }
}, initialState);

export default companyDashboardReducer;

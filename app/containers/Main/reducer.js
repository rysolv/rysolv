/* eslint-disable default-case, no-param-reassign */
import produce from 'immer';

import { CLOSE_MODAL_STATE, OPEN_MODAL_STATE } from './constants';

export const initialState = {
  isModalOpen: { issueWatchList: false, userWatchList: false },
  modal: '',
  tableData: [],
};

const mainReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLOSE_MODAL_STATE: {
      const { modalState } = payload;
      draft.isModalOpen[modalState] = false;
      draft.modal = initialState.modal;
      break;
    }
    case OPEN_MODAL_STATE: {
      const { modalState } = payload;
      draft.isModalOpen[modalState] = true;
      draft.modal = modalState;
      break;
    }
  }
}, initialState);

export default mainReducer;

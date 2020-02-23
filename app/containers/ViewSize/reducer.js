/* eslint-disable default-case, no-param-reassign */
import produce from 'immer';
import { CHANGE_RESPONSIVE_VIEW } from './constants';

export const initialState = { deviceView: '' };

const viewSizeReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_RESPONSIVE_VIEW: {
      const { newView } = payload;
      console.log('newView', newView);
      draft.deviceView = newView;
      break;
    }
  }
});

export default viewSizeReducer;

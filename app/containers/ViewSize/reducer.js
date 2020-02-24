/* eslint-disable default-case, no-param-reassign */
import produce from 'immer';
import { CHANGE_RESPONSIVE_VIEW } from './constants';

export const initialState = { deviceView: 'desktop' };

// eslint-disable-next-line consistent-return
const viewSizeReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_RESPONSIVE_VIEW: {
      const { newView } = payload;
      draft.deviceView = newView;
      break;
    }
    default:
      return initialState;
  }
});

export default viewSizeReducer;

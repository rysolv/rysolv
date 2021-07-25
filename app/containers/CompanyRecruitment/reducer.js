/* eslint-disable consistent-return, default-case, no-param-reassign, no-unused-vars */
import produce from 'immer';

import {
  RESET_FORM,
  SEND_FORM_FAILURE,
  SEND_FORM_SUCCESS,
  SEND_FORM,
} from './constants';

export const initialState = {
  error: false,
  loading: false,
  success: false,
};

const companyRecruitmentReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case RESET_FORM: {
      draft.error = initialState.error;
      draft.loading = initialState.loading;
      draft.success = initialState.success;
      break;
    }
    case SEND_FORM_FAILURE: {
      draft.loading = false;
      draft.error = true;
      break;
    }
    case SEND_FORM_SUCCESS: {
      draft.loading = false;
      draft.success = true;
      break;
    }
    case SEND_FORM: {
      draft.error = false;
      draft.loading = true;
      draft.success = false;
      break;
    }
  }
}, initialState);

export default companyRecruitmentReducer;

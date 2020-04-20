import produce from 'immer';

import { ADMIN } from './constants';

export const initialState = {
  admin: {
    id: '3f6e3ddf-ab68-4ee3-bb79-abfe21c8d014',
    username: 'Admin',
    profilePic:
      'https://cdn0.iconfinder.com/data/icons/web-service-and-development/512/key_protection_lock_security_access_forbidden_safe_secure_private_red_alert_password_protect_admin_safety_unlock_system_flat_design_icon-512.png',
  },
};

/* eslint-disable default-case, no-param-reassign */
const companiesReducer = produce((draft, { type }) => {
  switch (type) {
    case ADMIN: {
      draft.admin = initialState.admin;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default companiesReducer;

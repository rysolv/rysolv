/* eslint-disable array-callback-return */
import produce from 'immer';
import remove from 'lodash/remove';

import {
  CLEAR_ALERTS,
  CLEAR_FORM,
  DELETE_ORGANIZATION_FAILURE,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  UPDATE_INFO_FAILURE,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO,
  VERIFY_INFO,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  organizations: [],
  organization: {},
  data: {
    organizationUrl: { error: '', value: '' },
    description: { error: '', value: '' },
    repoUrl: { error: '', value: '' },
    logo: { error: '', value: '' },
    importUrl: { error: '', value: '' },
    name: { error: '', value: '' },
    verified: { error: '', value: false },
    totalFunded: { error: '', value: '' },
  },
  editInfo: {
    id: { error: '', value: '' },
    createdDate: { error: '', value: '' },
    description: { error: '', value: '' },
    issues: { error: '', value: '' },
    logo: { error: '', value: '' },
    modifiedDate: { error: '', value: '' },
    name: { error: '', value: '' },
    organizationUrl: { error: '', value: '' },
    repoUrl: { error: '', value: '' },
    verified: { error: '', value: '' },
  },
  filter: {
    issues: 'Newest',
  },
  loading: {
    addOrganization: false,
    organizations: false,
    deleteOrganization: false,
    fetchOrganization: false,
    saveOrganization: false,
    searchOrganizations: false,
    updateOrganization: false,
  },
  error: {
    organizations: false,
    fetchOrganization: false,
    searchOrganizations: false,
  },
  isVerified: false,
  search: {
    contributorInput: { error: '', value: '' },
    issueInput: { error: '', value: '' },
    searchInput: { error: '', value: '' },
  },
  step: {
    addOrganization: 1,
    editOrganization: 1,
  },
};

/* eslint-disable default-case, no-param-reassign */
const organizationsReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      break;
    }
    case CLEAR_FORM: {
      draft.data = initialState.data;
      draft.isVerified = initialState.isVerified;
      break;
    }
    case DELETE_ORGANIZATION_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.deleteOrganization = false;
      break;
    }
    case DELETE_ORGANIZATION_SUCCESS: {
      const { itemId, message } = payload;
      draft.alerts.success = { message };
      draft.loading.deleteOrganization = false;
      remove(draft.organizations, ({ id }) => id === itemId);
      break;
    }
    case DELETE_ORGANIZATION: {
      draft.loading.deleteOrganization = true;
      break;
    }
    case FETCH_ORGANIZATIONS_FAILURE: {
      const { error } = payload;
      draft.error.organizations = error;
      draft.loading.organizations = false;
      break;
    }
    case FETCH_ORGANIZATIONS_SUCCESS: {
      const { getOrganizations } = payload;
      draft.organizations = getOrganizations;
      draft.loading.organizations = false;
      break;
    }
    case FETCH_ORGANIZATIONS: {
      draft.loading.organizations = true;
      break;
    }
    case FETCH_INFO_FAILURE: {
      const { error } = payload;
      draft.error.fetchOrganizations = error;
      draft.loading.fetchOrganization = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { organization } = payload;
      Object.keys(organization).forEach(detail => {
        if (draft.editInfo[detail]) {
          draft.editInfo[detail].value = organization[detail];
        }
      });
      draft.organization = organization;
      draft.loading.fetchOrganization = false;
      break;
    }
    case FETCH_INFO: {
      draft.loading.fetchOrganization = true;
      break;
    }
    case INCREMENT_STEP: {
      const { step, view } = payload;
      draft.step[view] = step;
      break;
    }
    case INPUT_CHANGE: {
      const { field, form, value } = payload;
      if (form === 'filter') {
        draft[form][field] = value;
      } else {
        draft[form][field].value = value;
      }
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
    case SAVE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.addOrganization = false;
      break;
    }
    case SAVE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.addOrganization = false;
      break;
    }
    case SAVE_INFO: {
      draft.loading.addOrganization = true;
      break;
    }
    case SEARCH_ORGANIZATIONS_FAILURE: {
      const { error } = payload;
      draft.error.searchOrganizations = error;
      draft.loading.searchOrganizations = false;
      break;
    }
    case SEARCH_ORGANIZATIONS_SUCCESS: {
      const { organizations } = payload;
      draft.organizations = organizations || null;
      draft.loading.searchOrganizations = false;
      break;
    }
    case SEARCH_ORGANIZATIONS: {
      draft.shouldSearch = true;
      break;
    }
    case UPDATE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.updateOrganization = false;
      break;
    }
    case UPDATE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.updateOrganization = false;
      break;
    }
    case UPDATE_INFO: {
      draft.loading.updateOrganization = true;
      break;
    }
    case VERIFY_INFO: {
      draft.isVerified = !draft.isVerified;
      break;
    }
  }
}, initialState);

export default organizationsReducer;

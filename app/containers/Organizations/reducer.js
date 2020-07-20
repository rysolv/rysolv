/* eslint-disable array-callback-return */
import produce from 'immer';
import remove from 'lodash/remove';

import {
  CHANGE_ORGANIZATION_FILTER,
  CHANGE_ORGANIZATION_SEARCH,
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
  IMPORT_ORGANIZATION_FAILURE,
  IMPORT_ORGANIZATION_SUCCESS,
  IMPORT_ORGANIZATION,
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
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE,
  VERIFY_INFO,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  organizations: [],
  organization: {},
  organizationData: {
    importUrl: { error: '', value: '' },
    organizationDescription: { error: '', value: '' },
    organizationId: { error: '', value: '' },
    organizationLogo: {
      error: '',
      value: 'https://rysolv.s3.us-east-2.amazonaws.com/defaultOrg.png',
    },
    organizationName: { error: '', value: '' },
    organizationRepo: { error: '', value: '' },
    organizationUrl: { error: '', value: '' },
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
    language: [],
    organization: [],
    overview: 'Newest',
    price: [0, 5000],
  },
  loading: {
    addOrganization: false,
    deleteOrganization: false,
    fetchOrganization: false,
    importOrganization: false,
    organizations: false,
    saveOrganization: false,
    searchOrganizations: false,
    updateOrganization: false,
    upvoteIssue: false,
  },
  error: {
    fetchOrganization: false,
    importOrganization: { error: false, message: '' },
    organizations: false,
    searchOrganizations: false,
  },
  importSuccess: false,
  isVerified: false,
  search: {
    contributorInput: { error: '', value: '' },
    issueInput: { error: '', value: '' },
    overviewInput: { error: '', value: '' },
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
    case CHANGE_ORGANIZATION_FILTER: {
      const { field, value } = payload;
      if (field === 'language' || field === 'organization') {
        draft.filter[field] = [];
        value.map(language => draft.filter[field].push(language));
      } else {
        draft.filter[field] = value;
      }
      break;
    }
    case CHANGE_ORGANIZATION_SEARCH: {
      const { field, value } = payload;
      draft.search[field].value = value;
      break;
    }
    case CLEAR_ALERTS: {
      draft.alerts = initialState.alerts;
      draft.filter = initialState.filter;
      draft.search = initialState.search;
      break;
    }
    case CLEAR_FORM: {
      draft.error = initialState.error;
      draft.importSuccess = initialState.importSuccess;
      draft.isVerified = initialState.isVerified;
      draft.organizationData = initialState.organizationData;
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
    case IMPORT_ORGANIZATION_FAILURE: {
      const { error } = payload;
      draft.error.importOrganization = { error: true, message: error.message };
      draft.loading.importOrganization = false;
      break;
    }
    case IMPORT_ORGANIZATION_SUCCESS: {
      const { importOrganization } = payload;
      draft.loading.importOrganization = false;
      Object.keys(draft.organizationData).map(field => {
        draft.organizationData[field].value = importOrganization[field];
      });
      draft.importSuccess = true;
      break;
    }
    case IMPORT_ORGANIZATION: {
      draft.loading.importOrganization = true;
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
        draft.error = initialState.error;
        draft[form][field].error = '';
        draft[form][field].value = value;
      }
      break;
    }
    case INPUT_ERROR: {
      const { errors } = payload;
      const fields = Object.keys(errors);
      fields.forEach(field => {
        draft.organizationData[field].error = errors[field] || '';
      });
      break;
    }
    case SAVE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = { message: error };
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
    case UPVOTE_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.upvoteIssue = false;
      break;
    }
    case UPVOTE_ISSUE_SUCCESS: {
      const { id, rep } = payload;
      draft.organization.issues.map((issue, index) => {
        if (issue.id === id) {
          draft.organization.issues[index].rep = rep;
        }
      });
      draft.loading.upvoteIssue = false;
      break;
    }
    case UPVOTE_ISSUE: {
      draft.loading.upvoteIssue = true;
      break;
    }
    case VERIFY_INFO: {
      draft.isVerified = !draft.isVerified;
      break;
    }
  }
}, initialState);

export default organizationsReducer;

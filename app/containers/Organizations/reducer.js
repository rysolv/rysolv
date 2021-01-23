/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import Identicon from 'identicon.js';

import {
  CHANGE_ORGANIZATION_FILTER,
  CHANGE_ORGANIZATION_SEARCH,
  CLEAR_ALERTS,
  CLEAR_FORM,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS,
  FETCH_USER_ORGANIZATIONS_FAILURE,
  FETCH_USER_ORGANIZATIONS_SUCCESS,
  FETCH_USER_ORGANIZATIONS,
  GENERATE_IDENTICON,
  IMPORT_ORGANIZATION_FAILURE,
  IMPORT_ORGANIZATION_SUCCESS,
  IMPORT_ORGANIZATION,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_STATE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_ORGANIZATIONS_FAILURE,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_ORGANIZATIONS,
  UPDATE_INFO_FAILURE,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO,
  UPDATE_IS_MANUAL,
  UPVOTE_ISSUE_FAILURE,
  UPVOTE_ISSUE_SUCCESS,
  UPVOTE_ISSUE_TEMP,
  UPVOTE_ISSUE,
} from './constants';

export const initialState = {
  alerts: { error: false, success: false },
  editInfo: {
    createdDate: { error: '', value: '' },
    description: { error: '', value: '' },
    id: { error: '', value: '' },
    issues: { error: '', value: '' },
    logo: { error: '', value: '' },
    modifiedDate: { error: '', value: '' },
    name: { error: '', value: '' },
    organizationUrl: { error: '', value: '' },
    repoUrl: { error: '', value: '' },
    verified: { error: '', value: '' },
  },
  error: {
    fetchOrganization: false,
    importOrganization: { error: false, message: '' },
    organizations: false,
    searchOrganizations: false,
    userOrganizations: false,
  },
  filter: {
    issues: 'Most Funded',
    language: [],
    organization: [],
    overview: 'Most Funded',
    price: [0, 5000],
  },
  importSuccess: false,
  isManual: false,
  loading: {
    addOrganization: false,
    fetchOrganization: false,
    importOrganization: false,
    organizations: false,
    saveOrganization: false,
    searchOrganizations: false,
    updateOrganization: false,
    upvoteIssue: false,
    userOrganizations: false,
  },
  organization: {},
  organizationData: {
    autoImportUrl: { error: '', value: '' },
    identiconId: { error: '', value: '' },
    importUrl: { error: '', value: '' },
    organizationDescription: { error: '', value: '' },
    organizationId: { error: '', value: '' },
    organizationLanguages: { error: '', value: '' },
    organizationLogo: { error: '', value: '' },
    organizationName: { error: '', value: '' },
    organizationRepo: { error: '', value: '' },
    organizationUrl: { error: '', value: '' },
  },
  organizations: [],
  search: {
    contributorInput: { error: '', value: '' },
    issueInput: { error: '', value: '' },
    overviewInput: { error: '', value: '' },
    searchInput: { error: '', value: '' },
  },
  step: {
    addOrganization: 1,
  },
  userOrganizations: [],
};

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
      draft.organizationData = initialState.organizationData;
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
    case FETCH_ORGANIZATIONS_FAILURE: {
      const { error } = payload;
      draft.error.organizations = error;
      draft.loading.organizations = false;
      break;
    }
    case FETCH_ORGANIZATIONS_SUCCESS: {
      const { organizations } = payload;
      draft.loading.organizations = false;
      draft.organizations = organizations;
      break;
    }
    case FETCH_ORGANIZATIONS: {
      draft.loading.organizations = true;
      break;
    }
    case FETCH_USER_ORGANIZATIONS_FAILURE: {
      draft.error.userOrganizations = true;
      draft.loading.userOrganizations = false;
      break;
    }
    case FETCH_USER_ORGANIZATIONS_SUCCESS: {
      const { organizations } = payload;
      draft.loading.userOrganizations = false;
      draft.userOrganizations = organizations;
      break;
    }
    case FETCH_USER_ORGANIZATIONS: {
      draft.loading.userOrganizations = true;
      break;
    }
    case GENERATE_IDENTICON: {
      const identiconId = uuidv4();
      const identicon = new Identicon(identiconId, 250).toString();
      draft.organizationData.identiconId.value = identiconId;
      draft.organizationData.organizationLogo.value = `data:image/png;base64,${identicon}`;
      break;
    }
    case IMPORT_ORGANIZATION_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.organizationData.autoImportUrl.error = error;
      draft.organizationData.autoImportUrl.value = '';
      draft.loading.importOrganization = false;
      break;
    }
    case IMPORT_ORGANIZATION_SUCCESS: {
      const { importOrganization } = payload;
      draft.loading.importOrganization = false;
      Object.keys(importOrganization).map(field => {
        if (draft.organizationData[field] && importOrganization[field]) {
          draft.organizationData[field].value = importOrganization[field];
        }
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
    case RESET_STATE: {
      return initialState;
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
      draft.loading.searchOrganizations = true;
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
      draft.alerts = initialState.alerts;
      draft.loading.updateOrganization = true;
      break;
    }
    case UPDATE_IS_MANUAL: {
      const { value } = payload;
      draft.isManual = value;
      break;
    }
    case UPVOTE_ISSUE_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.upvoteIssue = false;
      break;
    }
    case UPVOTE_ISSUE_SUCCESS: {
      const { issueId, issueRep } = payload;
      draft.organization.issues.map(({ id }, index) => {
        if (id === issueId) {
          draft.organization.issues[index].rep = issueRep;
        }
      });
      draft.loading.upvoteIssue = false;
      break;
    }
    case UPVOTE_ISSUE_TEMP: {
      const { issueId, upvote } = payload;
      draft.organization.issues.map(({ id }, index) => {
        if (id === issueId) {
          // eslint-disable-next-line no-unused-expressions
          upvote
            ? (draft.organization.issues[index].rep += 1)
            : (draft.organization.issues[index].rep -= 1);
        }
      });
      break;
    }
    case UPVOTE_ISSUE: {
      draft.loading.upvoteIssue = true;
      break;
    }
  }
}, initialState);

export default organizationsReducer;

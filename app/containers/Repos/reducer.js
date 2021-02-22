/* eslint-disable array-callback-return, consistent-return, default-case, no-param-reassign */
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import Identicon from 'identicon.js';

import {
  CHANGE_REPO_FILTER,
  CHANGE_REPO_SEARCH,
  CLEAR_ALERTS,
  CLEAR_FORM,
  FETCH_INFO_FAILURE,
  FETCH_INFO_SUCCESS,
  FETCH_INFO,
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS,
  FETCH_USER_REPOS_FAILURE,
  FETCH_USER_REPOS_SUCCESS,
  FETCH_USER_REPOS,
  GENERATE_IDENTICON,
  IMPORT_REPO_FAILURE,
  IMPORT_REPO_SUCCESS,
  IMPORT_REPO,
  INCREMENT_STEP,
  INPUT_CHANGE,
  INPUT_ERROR,
  RESET_STATE,
  SAVE_INFO_FAILURE,
  SAVE_INFO_SUCCESS,
  SAVE_INFO,
  SEARCH_REPOS_FAILURE,
  SEARCH_REPOS_SUCCESS,
  SEARCH_REPOS,
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
    fetchRepo: false,
    importRepo: { error: false, message: '' },
    repos: false,
    userRepos: false,
  },
  filter: {
    issues: 'Most Funded',
    language: [],
    overview: 'Most Funded',
    price: [0, 5000],
    repo: [],
  },
  importSuccess: false,
  isManual: false,
  isNotFound: false,
  loading: {
    addRepo: false,
    fetchRepo: false,
    importRepo: false,
    repos: false,
    searchRepos: false,
    updateRepo: false,
    upvoteIssue: false,
    userRepos: false,
  },
  repo: {},
  repoData: {
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
  repos: [],
  search: {
    contributorInput: { error: '', value: '' },
    issueInput: { error: '', value: '' },
    overviewInput: { error: '', value: '' },
    searchInput: { error: '', value: '' },
  },
  step: {
    addRepo: 1,
  },
  userRepos: [],
};

const reposReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CHANGE_REPO_FILTER: {
      const { field, value } = payload;
      if (field === 'language' || field === 'repo') {
        draft.filter[field] = [];
        value.map(language => draft.filter[field].push(language));
      } else {
        draft.filter[field] = value;
      }
      break;
    }
    case CHANGE_REPO_SEARCH: {
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
      draft.repoData = initialState.repoData;
      break;
    }
    case FETCH_INFO_FAILURE: {
      const { error, isNotFound } = payload;
      draft.error.fetchRepo = error.message;
      draft.isNotFound = isNotFound;
      draft.loading.fetchRepo = false;
      break;
    }
    case FETCH_INFO_SUCCESS: {
      const { repo } = payload;
      Object.keys(repo).forEach(detail => {
        if (draft.editInfo[detail]) {
          draft.editInfo[detail].value = repo[detail];
        }
      });
      draft.loading.fetchRepo = false;
      draft.repo = repo;
      break;
    }
    case FETCH_INFO: {
      draft.loading.fetchRepo = true;
      break;
    }
    case FETCH_REPOS_FAILURE: {
      const { error } = payload;
      draft.error.repos = error;
      draft.loading.repos = false;
      break;
    }
    case FETCH_REPOS_SUCCESS: {
      const { repos } = payload;
      draft.loading.repos = false;
      draft.repos = repos;
      break;
    }
    case FETCH_REPOS: {
      draft.loading.repos = true;
      break;
    }
    case FETCH_USER_REPOS_FAILURE: {
      draft.error.userRepos = true;
      draft.loading.userRepos = false;
      break;
    }
    case FETCH_USER_REPOS_SUCCESS: {
      const { repos } = payload;
      draft.loading.userRepos = false;
      draft.useRepos = repos;
      break;
    }
    case FETCH_USER_REPOS: {
      draft.loading.userRepos = true;
      break;
    }
    case GENERATE_IDENTICON: {
      const identiconId = uuidv4();
      const identicon = new Identicon(identiconId, 250).toString();
      draft.repoData.identiconId.value = identiconId;
      draft.repoData.organizationLogo.value = `data:image/png;base64,${identicon}`;
      break;
    }
    case IMPORT_REPO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.importRepo = false;
      draft.repoData.autoImportUrl.error = error;
      draft.repoData.autoImportUrl.value = '';
      break;
    }
    case IMPORT_REPO_SUCCESS: {
      const { importRepo } = payload;
      Object.keys(importRepo).map(field => {
        if (draft.repoData[field] && importRepo[field]) {
          draft.repoData[field].value = importRepo[field];
        }
      });
      draft.importSuccess = true;
      draft.loading.importRepo = false;
      break;
    }
    case IMPORT_REPO: {
      draft.loading.importRepo = true;
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
        draft.repoData[field].error = errors[field] || '';
      });
      break;
    }
    case RESET_STATE: {
      return initialState;
    }
    case SAVE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.addRepo = false;
      break;
    }
    case SAVE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.addRepo = false;
      break;
    }
    case SAVE_INFO: {
      draft.loading.addRepo = true;
      break;
    }
    case SEARCH_REPOS_FAILURE: {
      draft.loading.searchRepos = false;
      break;
    }
    case SEARCH_REPOS_SUCCESS: {
      const { repos } = payload;
      draft.repos = repos || null;
      draft.loading.searchRepos = false;
      break;
    }
    case SEARCH_REPOS: {
      draft.loading.searchRepos = true;
      break;
    }
    case UPDATE_INFO_FAILURE: {
      const { error } = payload;
      draft.alerts.error = error;
      draft.loading.updateRepo = false;
      break;
    }
    case UPDATE_INFO_SUCCESS: {
      const { message } = payload;
      draft.alerts.success = { message };
      draft.loading.updateRepo = false;
      break;
    }
    case UPDATE_INFO: {
      draft.alerts = initialState.alerts;
      draft.loading.updateRepo = true;
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
      draft.repo.issues.map(({ id }, index) => {
        if (id === issueId) {
          draft.repo.issues[index].rep = issueRep;
        }
      });
      draft.loading.upvoteIssue = false;
      break;
    }
    case UPVOTE_ISSUE_TEMP: {
      const { issueId, upvote } = payload;
      draft.repo.issues.map(({ id }, index) => {
        if (id === issueId) {
          // eslint-disable-next-line no-unused-expressions
          upvote
            ? (draft.repo.issues[index].rep += 1)
            : (draft.repo.issues[index].rep -= 1);
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

export default reposReducer;

/* eslint-disable no-underscore-dangle */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  fetchActiveUser,
  updateActiveUser,
  upvoteUserTemp,
} from 'containers/Auth/actions';
import { post } from 'utils/request';

import {
  DELETE_ORGANIZATION,
  FETCH_INFO,
  FETCH_ORGANIZATIONS,
  IMPORT_ORGANIZATION,
  SAVE_INFO,
  SEARCH_ORGANIZATIONS,
  successCreateOrganizationMessage,
  successEditOrganizationMessage,
  UPDATE_INFO,
  UPVOTE_ISSUE,
} from './constants';
import {
  deleteOrganizationFailure,
  deleteOrganizationSuccess,
  fetchInfo,
  fetchInfoFailure,
  fetchInfoSuccess,
  fetchOrganizationsFailure,
  fetchOrganizationsSuccess,
  importOrganizationFailure,
  importOrganizationSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchOrganizationsFailure,
  searchOrganizationsSuccess,
  updateInfoFailure,
  updateInfoSuccess,
  upvoteIssueFailure,
  upvoteIssueSuccess,
  upvoteIssueTemp,
} from './actions';

export function* deleteOrganizationSaga({ payload }) {
  const { itemId } = payload;
  try {
    const query = `
    mutation{
      deleteOrganization(id: "${itemId}")
    }`;
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { deleteOrganization },
    } = yield call(post, '/graphql', graphql);
    yield put(
      deleteOrganizationSuccess({ itemId, message: deleteOrganization }),
    );
  } catch (error) {
    yield put(deleteOrganizationFailure({ error }));
  }
}

export function* fetchOrganizationsSaga() {
  const query = `
  query {
    getOrganizations {
      id,
      createdDate,
      modifiedDate,
      name,
      description,
      repoUrl,
      organizationUrl,
      issues,
      logo,
      verified,
      totalFunded,
      preferredLanguages
    }
  }
`;
  try {
    const organizationsQuery = JSON.stringify({
      query,
      variables: {},
    });
    const { data: getOrganizations } = yield call(
      post,
      '/graphql',
      organizationsQuery,
    );
    yield put(fetchOrganizationsSuccess(getOrganizations));
  } catch (error) {
    yield put(fetchOrganizationsFailure({ error }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { itemId } = payload;
  const query = `
  query {
    oneOrganization(id: "${itemId}") {
      __typename
      ... on Organization {
        contributors,
        createdDate,
        description,
        id,
        issues,
        logo,
        modifiedDate,
        name,
        organizationUrl,
        ownerId,
        preferredLanguages
        repoUrl,
        totalFunded,
        verified,
      }
      ... on Error {
        message
      }
    }
    getOrganizationActivity(organizationId: "${itemId}") {
      __typename
      ... on ActivityArray {
        activityArray {
          actionType
          activityId
          createdDate
          fundedValue
          issueId
          issueName
          organizationId
          organizationName
          profilePic
          pullRequestId
          userId
          username
        }
      }
      ... on Error {
        message
      }
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        oneOrganization,
        getOrganizationActivity: { activityArray },
      },
    } = yield call(post, '/graphql', graphql);
    oneOrganization.activity = activityArray;

    if (oneOrganization.__typename === 'Error') {
      throw new Error(oneOrganization.message);
    }

    yield put(fetchInfoSuccess({ organization: oneOrganization }));
  } catch (error) {
    yield put(fetchInfoFailure({ error }));
  }
}

export function* importOrganizationSaga({ payload }) {
  const { validatedUrl } = payload;
  const query = `
  mutation{
    importOrganization(url: "${validatedUrl}") {
      __typename
      ... on ImportData {
        organizationDescription,
        organizationId,
        organizationLanguages,
        organizationLogo,
        organizationName,
        organizationRepo,
        organizationUrl,
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        importOrganization,
        importOrganization: { __typename },
      },
    } = yield call(post, '/graphql', graphql);

    if (__typename === 'Error') {
      throw new Error(importOrganization.message);
    }

    yield put(importOrganizationSuccess({ importOrganization }));
  } catch (error) {
    yield put(importOrganizationFailure({ error }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: {
      identiconId,
      isManual,
      organizationDescription,
      organizationLogo,
      organizationName,
      organizationRepo,
      organizationUrl,
    },
    activeUser: { id: userId },
  } = payload;

  const query = `
  mutation {
    createOrganization(organizationInput: {
      identiconId: "${identiconId}",
      isManual: ${isManual},
      organizationDescription: "${organizationDescription}",
      organizationLogo: "${organizationLogo}",
      organizationName: "${organizationName}",
      organizationRepo: "${organizationRepo}",
      organizationUrl: "${organizationUrl}",
      ownerId: "${userId}"
    }) {
      __typename
      ... on Organization {
        id
        name
      }
      ... on Error {
        message
      }
    }
  }`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { createOrganization },
    } = yield call(post, '/graphql', graphql);
    const { __typename, id, message } = createOrganization;
    if (__typename === 'Error') throw message;

    yield put(fetchActiveUser({ userId }));
    yield put(push(`/organizations/detail/${id}`));
    yield put(saveInfoSuccess({ message: successCreateOrganizationMessage }));
  } catch (error) {
    yield put(push('/organizations'));
    yield put(saveInfoFailure({ error }));
  }
}

export function* searchOrganizationsSaga({ payload }) {
  const { value } = payload;
  const query = `
  query {
    searchOrganizations(value: "${value}") {
    __typename
      ... on OrganizationArray {
        organizationArray {
          createdDate
          description
          id
          issues
          logo
          modifiedDate
          name
          organizationUrl
          repoUrl
          totalFunded
          verified
        }
      }
      ... on Error {
        message
      }
    }
  }
`;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        searchOrganizations: { __typename, message, organizationArray },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;

    yield put(searchOrganizationsSuccess({ organizations: organizationArray }));
  } catch (error) {
    yield put(searchOrganizationsFailure({ error }));
  }
}

export function* updateInfoSaga({ payload }) {
  const { editRequest, itemId } = payload;
  const {
    organizationUrl,
    description,
    logo,
    name,
    preferredLanguages,
    repoUrl,
    verified,
  } = editRequest;
  const query = `
    mutation {
      transformOrganization(id: "${itemId}", organizationInput: {
        organizationDescription: "${description}",
        organizationLogo: "${logo}",
        organizationName: "${name}",
        organizationPreferredLanguages: ${JSON.stringify(preferredLanguages)},
        organizationRepo: "${repoUrl}",
        organizationUrl: "${organizationUrl}",
        organizationVerified: ${verified},
      }) {
        __typename
        ... on Organization {
          id,
          createdDate,
          modifiedDate,
          name,
          description,
          repoUrl,
          organizationUrl,
          issues,
          logo,
          verified,
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { transformOrganization },
    } = yield call(post, '/graphql', graphql);
    if (transformOrganization.__typename === 'Error') {
      throw transformOrganization;
    }
    yield put(fetchInfo({ itemId }));
    yield put(updateInfoSuccess({ message: successEditOrganizationMessage }));
  } catch (error) {
    yield put(updateInfoFailure({ error }));
  }
}

export function* upvoteIssueSaga({ payload }) {
  const { issueId, upvote, userId } = payload;

  // Update front end upvote. Reduce percieved loading time.
  yield put(upvoteIssueTemp({ issueId, upvote }));
  yield put(upvoteUserTemp({ issueId, upvote }));

  const upvoteIssueQuery = `
    mutation {
      upvoteIssue(issueId: "${issueId}", upvote: ${upvote}, userId: "${userId}") {
        __typename
        ... on Upvote {
          issueRep,
          userRep
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const upvoteIssue = JSON.stringify({
      query: upvoteIssueQuery,
      variables: {},
    });
    const {
      data: {
        upvoteIssue: { __typename, issueRep, message, userRep },
      },
    } = yield call(post, '/graphql', upvoteIssue);
    if (__typename === 'Error') throw new Error(message);

    yield put(upvoteIssueSuccess({ issueId, issueRep }));

    if (upvote) {
      yield put(updateActiveUser({ rep: userRep, addUpvote: issueId }));
    } else {
      yield put(updateActiveUser({ rep: userRep, removeUpvote: issueId }));
    }
  } catch (error) {
    yield put(upvoteIssueFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(DELETE_ORGANIZATION, deleteOrganizationSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrganizationsSaga);
  yield takeLatest(IMPORT_ORGANIZATION, importOrganizationSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga);
  yield takeLatest(UPDATE_INFO, updateInfoSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssueSaga);
}

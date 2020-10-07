/* eslint-disable no-underscore-dangle */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  fetchActiveUser,
  updateActiveUser,
  upvoteUserTemp,
} from 'containers/Auth/actions';
import { fetchCurrentSession } from 'utils/authHelper';
import { post } from 'utils/request';

import {
  FETCH_INFO,
  FETCH_ORGANIZATIONS,
  IMPORT_ORGANIZATION,
  SAVE_INFO,
  SEARCH_ORGANIZATIONS,
  UPDATE_INFO,
  UPVOTE_ISSUE,
} from './constants';
import {
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

export function* fetchOrganizationsSaga() {
  const query = `
    query {
      getOrganizations {
        __typename
        ... on OrganizationArray {
          organizations {
            createdDate
            description
            id
            issues
            logo
            modifiedDate
            name
            organizationUrl
            preferredLanguages
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
    const organizationsQuery = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        getOrganizations: { __typename, message, organizations },
      },
    } = yield call(post, '/graphql', organizationsQuery);
    if (__typename === 'Error') throw message;
    yield put(fetchOrganizationsSuccess({ organizations }));
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
          contributors
          createdDate
          description
          id
          issues
          logo
          modifiedDate
          name
          organizationUrl
          ownerId
          preferredLanguages
          repoUrl
          totalFunded
          verified
        }
        ... on Error {
          message
        }
      }
      getOrganizationActivity(organizationId: "${itemId}") {
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
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: {
        getOrganizationActivity,
        oneOrganization: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    restProps.activity = getOrganizationActivity;
    yield put(fetchInfoSuccess({ organization: restProps }));
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
          organizationDescription
          organizationId
          organizationLanguages
          organizationLogo
          organizationName
          organizationRepo
          organizationUrl
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
        importOrganization: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(importOrganizationSuccess({ importOrganization: restProps }));
  } catch (error) {
    yield put(importOrganizationFailure({ error: { message: error } }));
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
          message
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
        createOrganization: { __typename, id, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchActiveUser({ userId }));
    yield put(push(`/organizations/detail/${id}`));
    yield put(saveInfoSuccess({ message }));
  } catch (error) {
    yield put(push('/organizations'));
    yield put(saveInfoFailure({ error: { message: error } }));
  }
}

export function* searchOrganizationsSaga({ payload }) {
  const { value } = payload;
  const query = `
    query {
      searchOrganizations(value: "${value}") {
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
  `;
  try {
    const graphql = JSON.stringify({
      query,
      variables: {},
    });
    const {
      data: { searchOrganizations },
    } = yield call(post, '/graphql', graphql);
    yield put(
      searchOrganizationsSuccess({ organizations: searchOrganizations }),
    );
  } catch (error) {
    yield put(searchOrganizationsFailure());
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
      transformOrganization(organizationId: "${itemId}", organizationInput: {
        organizationDescription: "${description}",
        organizationLogo: "${logo}",
        organizationName: "${name}",
        organizationPreferredLanguages: ${JSON.stringify(preferredLanguages)},
        organizationRepo: "${repoUrl}",
        organizationUrl: "${organizationUrl}",
        organizationVerified: ${verified},
      }) {
        __typename
        ... on Success {
          message
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
        transformOrganization: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchInfo({ itemId }));
    yield put(updateInfoSuccess({ message }));
  } catch (error) {
    yield put(updateInfoFailure({ error: { message: error } }));
  }
}

export function* upvoteIssueSaga({ payload }) {
  const { issueId, upvote } = payload;

  // Update front end upvote. Reduce percieved loading time.
  yield put(upvoteIssueTemp({ issueId, upvote }));
  yield put(upvoteUserTemp({ issueId, upvote }));

  const upvoteIssueQuery = `
    mutation {
      upvoteIssue(issueId: "${issueId}", upvote: ${upvote}) {
        __typename
        ... on Upvote {
          issueRep
          userRep
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const token = yield call(fetchCurrentSession);

    const upvoteIssue = JSON.stringify({
      query: upvoteIssueQuery,
      variables: { token },
    });
    const {
      data: {
        upvoteIssue: { __typename, issueRep, message, userRep },
      },
    } = yield call(post, '/graphql', upvoteIssue);
    if (__typename === 'Error') throw message;
    yield put(upvoteIssueSuccess({ issueId, issueRep }));
    if (upvote) {
      yield put(updateActiveUser({ rep: userRep, addUpvote: issueId }));
    } else {
      yield put(updateActiveUser({ rep: userRep, removeUpvote: issueId }));
    }
  } catch (error) {
    yield put(upvoteIssueFailure({ error: { message: error } }));
    yield put(upvoteIssueTemp({ issueId, upvote: !upvote }));
    yield put(upvoteUserTemp({ issueId, upvote: !upvote }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrganizationsSaga);
  yield takeLatest(IMPORT_ORGANIZATION, importOrganizationSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga);
  yield takeLatest(UPDATE_INFO, updateInfoSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssueSaga);
}

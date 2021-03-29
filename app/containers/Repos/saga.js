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
  ADD_REPO_PAYOUT,
  FETCH_INFO,
  FETCH_REPOS,
  FETCH_USER_REPOS,
  IMPORT_REPO,
  SAVE_INFO,
  SEARCH_REPOS,
  UPDATE_INFO,
  UPVOTE_ISSUE,
} from './constants';
import {
  fetchInfo,
  fetchInfoFailure,
  fetchInfoSuccess,
  fetchReposFailure,
  fetchReposSuccess,
  fetchUserReposFailure,
  fetchUserReposSuccess,
  importRepoFailure,
  importRepoSuccess,
  saveInfoFailure,
  saveInfoSuccess,
  searchReposFailure,
  searchReposSuccess,
  updateInfoFailure,
  updateInfoSuccess,
  upvoteIssueFailure,
  upvoteIssueSuccess,
  upvoteIssueTemp,
} from './actions';

export function* addRepoPayoutSaga({ payload }) {
  const { editRequest, itemId } = payload;
  const { payoutMethod, payoutUrl } = editRequest;
  const query = `
    mutation {
      addRepoPayout(repoId: "${itemId}", repoInput: {
        payoutMethod: "${payoutMethod}",
        payoutUrl: "${payoutUrl}"
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        addRepoPayout: { __typename, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchInfo({ itemId }));
    yield put(updateInfoSuccess({ message }));
  } catch (error) {
    yield put(updateInfoFailure({ error: { message: error } }));
  }
}

export function* fetchInfoSaga({ payload }) {
  const { itemId } = payload;
  const query = `
    query {
      oneRepo(id: "${itemId}") {
        __typename
        ... on Repo {
          contributors
          description
          earnedBounties
          githubOwners
          id
          issues
          logo
          maintainerProceeds
          name
          organizationUrl
          payoutUrl
          preferredLanguages
          repoUrl
          totalFunded
          verified
        }
        ... on Error {
          message
        }
      }
      getRepoActivity(repoId: "${itemId}") {
        actionType
        activityId
        createdDate
        fundedValue
        issueId
        issueName
        profilePic
        pullRequestId
        repoId
        repoName
        userId
        username
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getRepoActivity,
        oneRepo: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw new Error(message);
    restProps.activity = getRepoActivity;
    yield put(fetchInfoSuccess({ repo: restProps }));
  } catch (error) {
    const { message } = error;
    const isNotFound = message === 'Not found';
    yield put(fetchInfoFailure({ error: { message }, isNotFound }));
  }
}

export function* fetchReposSaga() {
  const query = `
    query {
      getRepos {
        __typename
        ... on RepoArray {
          repos {
            description
            id
            issues
            logo
            modifiedDate
            name
            preferredLanguages
            totalFunded
          }
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getRepos: { __typename, message, repos },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchReposSuccess({ repos }));
  } catch (error) {
    yield put(fetchReposFailure({ error }));
  }
}

export function* fetchUserReposSaga() {
  const query = `
    query {
      getUserRepos {
        __typename
        ... on RepoArray {
          repos {
            exists
            modifiedDate
            name
            organizationUrl
          }
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        getUserRepos: { __typename, message, repos },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchUserReposSuccess({ repos }));
  } catch (error) {
    yield put(fetchUserReposFailure());
  }
}

export function* importRepoSaga({ payload }) {
  const { validatedUrl } = payload;
  const query = `
    mutation{
      importRepo(url: "${validatedUrl}") {
        __typename
        ... on ImportData {
          organizationUrl
          repoDescription
          repoId
          repoLanguages
          repoLogo
          repoName
          repoUrl
        }
        ... on Error {
          message
        }
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: {
        importRepo: { __typename, message, ...restProps },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(importRepoSuccess({ importRepo: restProps }));
  } catch (error) {
    yield put(importRepoFailure({ error: { message: error } }));
  }
}

export function* saveInfoSaga({ payload }) {
  const {
    requestBody: {
      autoImportUrl,
      identiconId,
      importUrl,
      isManual,
      organizationUrl,
      repoDescription,
      repoLanguages,
      repoLogo,
      repoName,
      repoUrl,
    },
  } = payload;
  const query = `
    mutation {
      createRepo(repoInput: {
        identiconId: "${identiconId}",
        importUrl: "${autoImportUrl || importUrl}",
        isManual: ${isManual},
        organizationUrl: "${organizationUrl}",
        repoDescription: ${JSON.stringify(repoDescription)},
        repoLanguages: "${repoLanguages}",
        repoLogo: "${repoLogo}",
        repoName: ${JSON.stringify(repoName)},
        repoUrl: "${repoUrl}"
      }) {
        __typename
        ... on Repo {
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        createRepo: { __typename, id, message },
      },
    } = yield call(post, '/graphql', graphql);
    if (__typename === 'Error') throw message;
    yield put(fetchActiveUser());
    yield put(push(`/repos/detail/${id}`));
    yield put(saveInfoSuccess({ message }));
  } catch (error) {
    yield put(push('/repos'));
    yield put(saveInfoFailure({ error: { message: error } }));
  }
}

export function* searchReposSaga({ payload }) {
  const { value } = payload;
  const query = `
    query {
      searchRepos(value: "${value}") {
        description
        id
        issues
        logo
        modifiedDate
        name
        preferredLanguages
        totalFunded
      }
    }
  `;
  try {
    const graphql = JSON.stringify({ query });
    const {
      data: { searchRepos },
    } = yield call(post, '/graphql', graphql);
    yield put(searchReposSuccess({ repos: searchRepos }));
  } catch (error) {
    yield put(searchReposFailure());
  }
}

export function* updateInfoSaga({ payload }) {
  const { editRequest, itemId } = payload;
  const {
    description,
    logo,
    name,
    organizationUrl,
    repoUrl,
    verified,
  } = editRequest;
  const query = `
    mutation {
      transformRepo(repoId: "${itemId}", repoInput: {
        organizationUrl: "${organizationUrl}",
        repoDescription: "${description}",
        repoLogo: "${logo}",
        repoName: "${name}",
        repoUrl: "${repoUrl}",
        repoVerified: ${verified}
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        transformRepo: { __typename, message },
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

  const query = `
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
    const graphql = JSON.stringify({ query });
    const {
      data: {
        upvoteIssue: { __typename, issueRep, message, userRep },
      },
    } = yield call(post, '/graphql', graphql);
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
  yield takeLatest(ADD_REPO_PAYOUT, addRepoPayoutSaga);
  yield takeLatest(FETCH_INFO, fetchInfoSaga);
  yield takeLatest(FETCH_REPOS, fetchReposSaga);
  yield takeLatest(FETCH_USER_REPOS, fetchUserReposSaga);
  yield takeLatest(IMPORT_REPO, importRepoSaga);
  yield takeLatest(SAVE_INFO, saveInfoSaga);
  yield takeLatest(SEARCH_REPOS, searchReposSaga);
  yield takeLatest(UPDATE_INFO, updateInfoSaga);
  yield takeLatest(UPVOTE_ISSUE, upvoteIssueSaga);
}

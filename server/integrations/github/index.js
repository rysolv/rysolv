/* eslint-disable camelcase */
const fetch = require('node-fetch');

const { authenticate } = require('./auth');

const getSingleIssue = async ({ issueNumber, organization, repo }) => {
  try {
    // Authenticate with oktokit API - @TODO: create better auth middleware
    const { GITHUB } = await authenticate();

    const { data: issueData } = await GITHUB.issues.get({
      issue_number: issueNumber,
      owner: organization,
      repo,
    });

    const {
      body,
      html_url,
      pull_request,
      repository_url,
      state,
      title,
    } = issueData;

    if (!html_url) {
      throw new Error(`Unable to import issue from ${repo}.`);
    }
    if (pull_request) {
      throw new Error('Issue addressed by existing pull request.');
    }
    if (state !== 'open') {
      throw new Error('Cannot add closed issue.');
    }

    const issueInput = {
      issueBody: body, // Required
      issueName: title, // Required
      issueUrl: html_url, // Required
      organizationUrl: repository_url, // Required
    };
    return { issueInput };
  } catch (err) {
    throw err;
  }
};

const getSingleOrganization = async organization => {
  // Authenticate with oktokit API - @TODO: create better auth middleware
  const { GITHUB } = await authenticate();

  const { data: organizationData } = await GITHUB.orgs.get({
    org: organization,
  });

  const {
    avatar_url,
    bio,
    blog,
    html_url,
    login,
    name,
    type,
  } = organizationData;

  if (!html_url) {
    throw new Error(`Unable to import organization from ${organization}.`);
  }
  if (type === 'User') {
    throw new Error('Cannot import user account as organization.');
  }

  const organizationInput = {
    organizationDescription: bio || '', // Optional
    organizationLanguages: [], // Optional
    organizationLogo: avatar_url, // Required
    organizationName: name || login, // Preferred name or login name
    organizationRepo: html_url, // Required
    organizationUrl: blog || '', // Optional
  };
  return { organizationInput };
};

const getSinglePullRequest = async ({ organization, repo, pullNumber }) => {
  // Authenticate with oktokit API - @TODO: create better auth middleware
  const { GITHUB } = await authenticate();

  const { data: pullRequestData } = await GITHUB.pulls.get({
    owner: organization,
    pull_number: pullNumber,
    repo,
  });

  const {
    html_url,
    mergeable_state,
    mergeable,
    merged,
    number,
    state,
    title,
    user: { id, login },
  } = pullRequestData;

  if (state !== 'open') {
    throw new Error('This pull request has been closed.');
  }
  if (merged) {
    throw new Error('Pull request has already been merged.');
  }

  const isMergeable = mergeable === null ? false : mergeable;
  const isMerged = merged === null ? false : merged;
  const pullData = {
    githubId: id,
    githubUsername: login,
    htmlUrl: html_url,
    mergeable: isMergeable,
    mergeableState: mergeable_state,
    merged: isMerged,
    open: state === 'open',
    pullNumber: number,
    status: state,
    title,
  };
  return pullData;
};

const getSingleRepo = async ({ organization, repo }) => {
  try {
    // Authenticate with oktokit API - TODO: create better auth middleware
    const { GITHUB } = await authenticate();

    const { data: repoData } = await GITHUB.repos.get({
      owner: organization,
      repo,
    });

    const {
      description,
      homepage,
      html_url,
      language,
      name,
      organization: parentOrganization,
    } = repoData;

    if (!html_url) {
      throw new Error(`Unable to import organization.`);
    }

    const organizationInput = {
      issueLanguages: [language], // Optional - one entry
      organizationDescription: description || '', // Optional
      organizationLanguages: [language], // Optional - one entry
      organizationName: name, // Required
      organizationRepo: html_url, // Required
      organizationUrl: homepage || '', // Optional
    };

    if (parentOrganization) {
      const { data: parentData } = await GITHUB.orgs.get({
        org: parentOrganization.login,
      });

      const {
        avatar_url,
        bio,
        blog,
        html_url: parentRepo,
        login,
        name: parentName,
      } = parentData;

      organizationInput.organizationLogo = avatar_url; // Required
      organizationInput.organizationName = parentName || login; // Preferred name or login name
      organizationInput.organizationRepo = parentRepo; // Required
      organizationInput.organizationUrl = blog || ''; // Optional
      // Only replace repo bio if parent bio exists
      if (bio) organizationInput.organizationDescription = bio;
    }

    return { organizationInput };
  } catch (err) {
    throw err;
  }
};

const requestGithubToken = credentials =>
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(res => res.json())
    .catch(error => {
      throw new Error(JSON.stringify(error));
    });

const requestGithubUserAccount = token =>
  fetch(`https://api.github.com/user?access_token=${token}`).then(res =>
    res.json(),
  );

const requestGithubUser = async credentials => {
  const { access_token } = await requestGithubToken(credentials);
  const { id, login } = await requestGithubUserAccount(access_token);
  return { github_id: id, github_username: login };
};

module.exports = {
  getSingleIssue,
  getSingleOrganization,
  getSinglePullRequest,
  getSingleRepo,
  requestGithubUser,
};

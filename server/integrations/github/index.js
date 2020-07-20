/* eslint-disable camelcase */
const { authenticate } = require('./auth');

const getSingleIssue = async ({ issueNumber, organization, repo }) => {
  try {
    // Authenticate with oktokit API - TODO: create better auth middleware
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
      issueBody: body,
      issueName: title,
      issueUrl: html_url,
      organizationUrl: repository_url,
    };
    return { issueInput };
  } catch (err) {
    throw err;
  }
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
      issueLanguages: [language],
      organizationDescription: description || '',
      organizationLanguages: [language],
      organizationLogo:
        'https://rysolv.s3.us-east-2.amazonaws.com/defaultOrg.png',
      organizationName: name,
      organizationRepo: html_url,
      organizationUrl: homepage,
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

      organizationInput.organizationLogo = avatar_url;
      organizationInput.organizationName = parentName || login;
      organizationInput.organizationRepo = parentRepo;
      organizationInput.organizationUrl = blog;
      if (bio) organizationInput.organizationDescription = bio;
    }

    return { organizationInput };
  } catch (err) {
    throw err;
  }
};

const getSingleOrganization = async organization => {
  // Authenticate with oktokit API - TODO: create better auth middleware
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
    organizationDescription: bio || '',
    organizationLanguages: [],
    organizationLogo: avatar_url,
    organizationName: name || login,
    organizationRepo: html_url,
    organizationUrl: blog,
  };
  return { organizationInput };
};

const getSinglePullRequest = async ({ organization, repo, pullNumber }) => {
  // Authenticate with oktokit API - TODO: create better auth middleware
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
    url: api_url,
    user: { login },
  } = pullRequestData;

  if (state !== 'open') {
    throw new Error('This pull request has been closed.');
  }
  if (merged) {
    throw new Error('Pull request has already been merged.');
  }

  const pullData = {
    apiUrl: api_url,
    githubUsername: login,
    htmlUrl: html_url,
    mergeable: !!mergeable,
    mergeableState: mergeable_state,
    merged: !!merged,
    open: state === 'open',
    pullNumber: number,
    status: state,
    title,
  };
  return pullData;
};

module.exports = {
  getSingleIssue,
  getSingleOrganization,
  getSinglePullRequest,
  getSingleRepo,
};

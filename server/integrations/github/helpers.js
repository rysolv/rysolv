const { CustomError, isUrl } = require('../../helpers');
const { getRepoMembers } = require('./index');

// ISSUE URL
// Incoming:  https://github.com/tylermaran/cadl/issues/5
const formatIssueUrl = value => {
  const { hostname, pathname } = new URL(value);
  const url = pathname.split('/');
  url.shift();

  const issueNumber = url[3];
  const organization = url[0];
  const repo = url[1];

  const containsGithub = hostname === 'github.com';
  const validIssueNumber = !Number.isNaN(parseInt(issueNumber, 10) + 1);
  const validIssues = url[2] === 'issues';
  const validLength = url.length === 4;

  if (containsGithub && validIssueNumber && validIssues && validLength) {
    return {
      formattedUrl: `https://api.github.com/repos/${organization}/${repo}/issues/${issueNumber}`,
      issueNumber,
      organization,
      repo,
    };
  }
  throw new CustomError(`Not a valid issue url.`);
};

const formatMemberList = async ({ githubId, issueUrl, repoId, repoUrl }) => {
  const { organization, repo } = issueUrl
    ? formatIssueUrl(issueUrl)
    : formatRepoUrl(repoUrl);
  const githubMembers = await getRepoMembers({ organization, repo });
  const formattedGithubMembers = githubMembers.map(({ id, type }) => ({
    githubId: id,
    repoId,
    userType: type,
  }));
  const formattedRysolvOwner = {
    githubId,
    repoId,
    userType: 'rysolv_owner',
  };
  return [...formattedGithubMembers, formattedRysolvOwner];
};

// PULL_REQUEST URL
// Incoming:  https://github.com/rysolv/rysolv/pull/4
const formatPullRequestUrl = value => {
  const { hostname, pathname } = new URL(value);
  const url = pathname.split('/');
  url.shift();

  const organization = url[0];
  const pullNumber = url[3];
  const repo = url[1];

  const containsGithub = hostname === 'github.com';
  const validLength = url.length === 4;
  const validPull = url[2] === 'pull';
  const validPullNumber = !Number.isNaN(parseInt(pullNumber, 10) + 1);

  if (containsGithub && validLength && validPull && validPullNumber) {
    return {
      formattedUrl: `https://api.github.com/repos/${organization}/${repo}/pulls/${pullNumber}`,
      organization,
      pullNumber,
      repo,
    };
  }
  throw new CustomError(`Not a valid pull request url.`);
};

// REPO URL
// Incoming:  https://github.com/NixOS or https://github.com/NixOS/nixpkgs-channels
const formatRepoUrl = value => {
  const newUrl = isUrl(value) ? value : `https://${value}`;
  const { hostname, pathname } = new URL(newUrl);

  const containsGithub = hostname === 'github.com';
  const url = pathname.split('/');
  url.shift();

  if (containsGithub && url.length === 2) {
    const repo = url[1];
    const organization = url[0];
    return {
      formattedUrl: `https://api.github.com/repos/${organization}/${repo}`,
      organization,
      repo,
      type: 'repo',
    };
  }
  if (containsGithub && url.length === 1) {
    const organization = url[0];
    return {
      formattedUrl: `https://api.github.com/users/${organization}`,
      organization,
      type: 'organization',
    };
  }
  throw new CustomError(`Not a valid repo url.`);
};

module.exports = {
  formatIssueUrl,
  formatMemberList,
  formatPullRequestUrl,
  formatRepoUrl,
};

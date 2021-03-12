const Sentry = require('@sentry/node');

const {
  formatIssueUrl,
  formatRepoUrl,
} = require('../integrations/github/helpers');
const { getRepoMembers } = require('../integrations/github');

Sentry.init({ dsn: process.env.SENTRY_DSN });

class CustomError extends Error {
  constructor(message) {
    super();
    this.alert = message;
  }
}

const arrayCheck = result => {
  if (Array.isArray(result) && result.length > 1) {
    return result;
  }
  if (Array.isArray(result) && result.length === 1) {
    return result[0];
  }
  return null;
};

const errorLogger = e => Sentry.captureException(e);

const formatMemberList = async ({
  githubId,
  issueUrl,
  repoId,
  repoUrl,
  userId,
}) => {
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
    userId,
    userType: 'rysolv_owner',
  };
  return [...formattedGithubMembers, formattedRysolvOwner];
};

const isUrl = string => {
  let url;
  try {
    url = new URL(string);
  } catch {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

module.exports = {
  arrayCheck,
  CustomError,
  errorLogger,
  formatMemberList,
  isUrl,
};

/* eslint-disable no-param-reassign */
const { CustomError, errorLogger } = require('../../../helpers');
const { getIssueList, getUserSettings } = require('../../../db');
const { getUserGithubIssues } = require('../../../integrations');
const { githubNotVerifiedError } = require('./constants');

const getUserIssues = async (_, { authError, userId }) => {
  if (authError) throw new CustomError(authError);

  try {
    const { githubUsername, isGithubVerified } = await getUserSettings({
      userId,
    });

    if (isGithubVerified) {
      const issueList = await getIssueList();
      const userIssues = await getUserGithubIssues({
        username: githubUsername,
      });

      const issues = userIssues.map(issue => {
        if (issueList && issueList.includes(issue.repo)) {
          issue.exists = true;
          return issue;
        }
        issue.exists = false;
        return issue;
      });

      return {
        __typename: 'IssueArray',
        issues,
      };
    }
    throw new CustomError(githubNotVerifiedError);
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert,
    };
  }
};

module.exports = getUserIssues;

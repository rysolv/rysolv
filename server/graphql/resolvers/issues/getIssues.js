const { errorLogger } = require('../../../helpers');
const { getIssues: getIssuesQuery } = require('../../../db');
const { getIssuesError } = require('./constants');

const getIssues = async () => {
  try {
    const issues = await getIssuesQuery();
    return {
      __typename: 'IssueArray',
      issues,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getIssuesError,
    };
  }
};

module.exports = getIssues;

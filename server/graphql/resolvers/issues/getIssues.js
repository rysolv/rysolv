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
    return {
      __typename: 'Error',
      message: getIssuesError,
    };
  }
};

module.exports = getIssues;

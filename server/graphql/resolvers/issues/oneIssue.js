const { getOneIssue: getOneIssueQuery } = require('../../../db');
const { oneIssueError } = require('./constants');

const oneIssue = async ({ id }) => {
  try {
    const issueDetail = await getOneIssueQuery({ issueId: id });
    return {
      __typename: 'Issue',
      ...issueDetail,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: oneIssueError,
    };
  }
};

module.exports = oneIssue;

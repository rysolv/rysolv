const { errorLogger } = require('../../../helpers');
const { getOneIssue: getOneIssueQuery } = require('../../../db');
const { oneIssueError } = require('./constants');

const oneIssue = async ({ id }) => {
  try {
    const issueDetail = await getOneIssueQuery({ issueId: id });
    if (!issueDetail) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    return {
      __typename: 'Issue',
      ...issueDetail,
    };
  } catch (error) {
    const { status } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: oneIssueError,
      status,
    };
  }
};

module.exports = oneIssue;

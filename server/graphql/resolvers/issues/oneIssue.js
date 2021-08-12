const { CustomError, errorLogger } = require('../../../helpers');
const { getOneIssue: getOneIssueQuery } = require('../../../db');
const { oneIssueError } = require('./constants');

const oneIssue = async ({ id }) => {
  try {
    const issueDetail = await getOneIssueQuery({ issueId: id });
    if (!issueDetail) throw new CustomError(`Not found`);

    return {
      __typename: 'Issue',
      ...issueDetail,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || oneIssueError,
    };
  }
};

module.exports = oneIssue;

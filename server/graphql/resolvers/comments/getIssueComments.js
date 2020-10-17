const { errorLogger } = require('../../../helpers');
const { getIssueComments: getIssueCommentsQuery } = require('../../../db');

const getIssueComments = async ({ issueId }) => {
  try {
    const comments = await getIssueCommentsQuery({ issueId });
    return comments;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getIssueComments;

const { getIssueComments: getIssueCommentsQuery } = require('../../../db');

const getIssueComments = async args => {
  const { issueId } = args;
  try {
    const result = await getIssueCommentsQuery({ issueId });
    return result;
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = getIssueComments;

const { getOneIssue: getOneIssueQuery } = require('../../../db');

const oneIssue = async ({ id }) => {
  try {
    const issueDetail = await getOneIssueQuery({ issueId: id });
    return {
      __typename: 'Issue',
      ...issueDetail,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = oneIssue;

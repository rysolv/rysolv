const { getOneIssue: getOneIssueQuery } = require('../../../db');

const oneIssue = async args => {
  const { id } = args;
  try {
    const result = await getOneIssueQuery({ issueId: id });
    return {
      __typename: 'Issue',
      ...result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = oneIssue;

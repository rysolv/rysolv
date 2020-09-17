const {
  getIssueAttemptList: getIssueAttemptListQuery,
} = require('../../../db');

const getIssueAttemptList = async args => {
  const { issueId } = args;
  try {
    const attemptList = await getIssueAttemptListQuery({ issueId });
    return attemptList;
  } catch (err) {
    throw err;
  }
};

module.exports = getIssueAttemptList;

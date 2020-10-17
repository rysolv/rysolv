const { errorLogger } = require('../../../helpers');
const {
  getIssueAttemptList: getIssueAttemptListQuery,
} = require('../../../db');

const getIssueAttemptList = async ({ issueId }) => {
  try {
    const attemptList = await getIssueAttemptListQuery({ issueId });
    return attemptList;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getIssueAttemptList;

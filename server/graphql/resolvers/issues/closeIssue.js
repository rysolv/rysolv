const { closeIssue: closeIssueQuery, getOneIssue } = require('../../../db');
const { createActivity } = require('../activity');

const closeIssue = async args => {
  const { issueId, shouldClose } = args;
  try {
    const response = await closeIssueQuery({ issueId, shouldClose });

    const result = await getOneIssue({ issueId });

    const activityInput = {
      actionType: shouldClose ? 'close' : 'reopen',
      issueId: result.id,
      organizationId: result.organizationId,
      userId: result.userId,
    };
    await createActivity({ activityInput });

    return response;
  } catch (err) {
    throw err;
  }
};

module.exports = closeIssue;

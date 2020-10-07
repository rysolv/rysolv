const { closeIssue: closeIssueQuery, getOneIssue } = require('../../../db');
const { closeIssueError, closeIssueSuccess } = require('./constants');
const { createActivity } = require('../activity');

const closeIssue = async ({ issueId, shouldClose }) => {
  try {
    await closeIssueQuery({ issueId, shouldClose });

    const issue = await getOneIssue({ issueId });

    const activityInput = {
      actionType: shouldClose ? 'close' : 'reopen',
      issueId: issue.id,
      organizationId: issue.organizationId,
      userId: issue.userId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Success',
      message: closeIssueSuccess({ shouldClose }),
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: closeIssueError({ shouldClose }),
    };
  }
};

module.exports = closeIssue;

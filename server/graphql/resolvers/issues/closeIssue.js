const { closeIssue: closeIssueQuery, getOneIssue } = require('../../../db');
const { closeIssueError, closeIssueSuccess } = require('./constants');
const { createActivity } = require('../activity');
const { CustomError, errorLogger } = require('../../../helpers');

const closeIssue = async ({ issueId, shouldClose }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

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
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || closeIssueError({ shouldClose }),
    };
  }
};

module.exports = closeIssue;

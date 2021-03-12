const { createActivity } = require('../activity');
const { CustomError, errorLogger } = require('../../../helpers');
const { transformIssue: transformIssueQuery } = require('../../../db');
const { transformIssueError, transformIssueSuccess } = require('./constants');

const transformIssue = async (
  { issueId, issueInput },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const data = {
      body: issueInput.body,
      language: issueInput.language,
      modified_date: new Date(), // update modified date
      name: issueInput.name,
      type: issueInput.type,
    };
    const result = await transformIssueQuery({ data, issueId });

    const activityInput = {
      actionType: 'update',
      issueId: result.id,
      queryResult: result.repoId,
      userId: result.contributorId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Success',
      message: transformIssueSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformIssueError,
    };
  }
};

module.exports = transformIssue;

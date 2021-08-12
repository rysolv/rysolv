const { createActivity } = require('../activity');
const { CustomError, errorLogger } = require('../../../helpers');
const { deletePullRequest: deletePullRequestQuery } = require('../../../db');
const {
  deletePullRequestError,
  deletePullRequestSuccess,
} = require('./constants');

const deletePullRequest = async ({ id }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await deletePullRequestQuery({ pullRequestId: id });

    const activityInput = {
      actionType: 'delete',
      issueId: result.issue_id,
      pullRequestId: id,
      userId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Success',
      message: deletePullRequestSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || deletePullRequestError,
    };
  }
};

module.exports = deletePullRequest;

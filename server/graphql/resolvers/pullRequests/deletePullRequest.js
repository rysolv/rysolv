const { CustomError, errorLogger } = require('../../../helpers');
const {
  deletePullRequest: deletePullRequestQuery,
  updateUserArray,
} = require('../../../db');
const {
  deletePullRequestError,
  deletePullRequestSuccess,
} = require('./constants');

const deletePullRequest = async ({ id }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await deletePullRequestQuery({ pullRequestId: id });
    await updateUserArray({
      column: 'pull_requests',
      data: id,
      remove: true,
      userId: result.user_id,
    });

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

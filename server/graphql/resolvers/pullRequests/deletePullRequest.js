const {
  deletePullRequest: deletePullRequestQuery,
  updateUserArray,
} = require('../../../db');

const deletePullRequest = async args => {
  const { id } = args;
  try {
    const result = await deletePullRequestQuery({ pullRequestId: id });
    await updateUserArray({
      column: 'pull_requests',
      data: id,
      userId: result.user_id,
      remove: true,
    });

    return {
      __typename: 'Success',
      message: `Pull request ${result.title} has successfully been deleted.`,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = deletePullRequest;

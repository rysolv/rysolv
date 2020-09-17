const { getOnePullRequest } = require('../../../db');

const onePullRequest = async args => {
  const { id } = args;
  try {
    const result = await getOnePullRequest({ pullRequestId: id });
    return {
      __typename: 'PullRequest',
      ...result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = onePullRequest;

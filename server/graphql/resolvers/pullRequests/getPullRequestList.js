const { getPullRequestList: getPullRequestListQuery } = require('../../../db');

const getPullRequestList = async args => {
  const { idArray } = args;
  try {
    const pullRequestList = await Promise.all(
      idArray.map(async id => {
        const result = await getPullRequestListQuery({ pullRequestId: id });
        return result;
      }),
    );
    const result = pullRequestList;
    return {
      __typename: 'PullRequestList',
      pullRequestList: result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = getPullRequestList;

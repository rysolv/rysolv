const { getIssueWatchList: getIssueWatchListQuery } = require('../../../db');

const getIssueWatchList = async args => {
  const { issueId } = args;
  try {
    const watchList = await getIssueWatchListQuery({ issueId });
    return watchList;
  } catch (err) {
    throw err;
  }
};

module.exports = getIssueWatchList;

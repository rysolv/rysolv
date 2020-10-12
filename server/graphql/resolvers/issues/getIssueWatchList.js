const { getIssueWatchList: getIssueWatchListQuery } = require('../../../db');

const getIssueWatchList = async ({ issueId }) => {
  try {
    const watchList = await getIssueWatchListQuery({ issueId });
    return watchList;
  } catch (error) {
    return [];
  }
};

module.exports = getIssueWatchList;

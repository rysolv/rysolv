const { errorLogger } = require('../../../helpers');
const { getIssueWatchList: getIssueWatchListQuery } = require('../../../db');

const getIssueWatchList = async ({ issueId }) => {
  try {
    const watchList = await getIssueWatchListQuery({ issueId });
    return watchList;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getIssueWatchList;

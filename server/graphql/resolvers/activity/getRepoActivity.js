const { errorLogger } = require('../../../helpers');
const { getRepoActivity: getRepoActivityQuery } = require('../../../db');

const getRepoActivity = async ({ repoId }) => {
  try {
    const activityArray = await getRepoActivityQuery({ repoId });
    return activityArray;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getRepoActivity;

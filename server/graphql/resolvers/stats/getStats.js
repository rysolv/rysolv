const { errorLogger } = require('../../../helpers');
const { getStats: getStatsQuery } = require('../../../db');
const { getStatsError } = require('./constants');

const getStats = async () => {
  try {
    const result = await getStatsQuery();
    return {
      __typename: 'Stats',
      ...result,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getStatsError,
    };
  }
};

module.exports = getStats;

const { errorLogger } = require('../../../helpers');
const { getPositions: getPositionsQuery } = require('../../../db');

const getPositions = async () => {
  try {
    const positions = await getPositionsQuery();
    return positions;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getPositions;

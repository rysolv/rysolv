const { errorLogger } = require('../../../helpers');
const { getPositions: getPositionsQuery } = require('../../../db');

const getPositions = async () => {
  try {
    const positions = await getPositionsQuery();
    const filteredPositions = positions.reduce((acc, position) => {
      const { positionData } = position;
      if (
        positionData.post_to_job_board &&
        positionData.post_to_job_board === 'Yes'
      ) {
        acc.push(position);
      }
      return acc;
    }, []);
    return filteredPositions;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getPositions;

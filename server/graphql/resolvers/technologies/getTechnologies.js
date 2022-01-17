const { errorLogger } = require('../../../helpers');
const { getTechnologies: getTechnologiesQuery } = require('../../../db');

const getTechnologies = async () => {
  try {
    const technologies = await getTechnologiesQuery();
    return technologies;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getTechnologies;

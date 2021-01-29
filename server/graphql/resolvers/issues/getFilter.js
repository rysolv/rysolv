const { errorLogger } = require('../../../helpers');
const { getFilter: getFilterQuery } = require('../../../db');
const { getFilterError } = require('./constants');

const getFilter = async () => {
  try {
    const filterCriteria = await getFilterQuery();
    return {
      __typename: 'Filter',
      ...filterCriteria,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getFilterError,
    };
  }
};

module.exports = getFilter;

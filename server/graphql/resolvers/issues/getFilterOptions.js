const { errorLogger } = require('../../../helpers');
const { getFilterError } = require('./constants');
const { getFilterOptions: getFilterOptionsQuery } = require('../../../db');

const getFilter = async () => {
  try {
    const filterOptions = await getFilterOptionsQuery();

    // Format repos and languages to fit the dropdown component
    filterOptions.issueLanguages = filterOptions.issueLanguages.map(el => ({
      value: el,
    }));
    filterOptions.repos = filterOptions.repos.map(el => ({
      value: el,
    }));
    filterOptions.userLanguages = filterOptions.userLanguages.map(el => ({
      value: el,
    }));

    return {
      __typename: 'Filter',
      ...filterOptions,
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

const { errorLogger } = require('../../../helpers');
const { getFilterError } = require('./constants');
const { getFilterOptions: getFilterOptionsQuery } = require('../../../db');

const getFilter = async () => {
  try {
    const filterOptions = await getFilterOptionsQuery();

    // Format organizations and languages to fit the dropdown component
    filterOptions.issueLanguages = filterOptions.issueLanguages.map(el => ({
      value: el,
    }));
    filterOptions.organizations = filterOptions.organizations.map(el => ({
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

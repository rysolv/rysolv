const { companyPositionValues } = require('./constants');
const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');

const createCompanyPosition = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: companyPositionValues,
  });

  const queryText = `
    INSERT INTO
    company_positions(${parameters})
    VALUES(${substitution})
  `;
  await singleQuery({ queryText, values });
};

module.exports = createCompanyPosition;

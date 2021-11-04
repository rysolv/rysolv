const { companyValues } = require('./constants');
const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');

const createCompany = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: companyValues,
  });

  const queryText = `
    INSERT INTO
    companies(${parameters})
    VALUES(${substitution})
  `;
  await singleQuery({ queryText, values });
};

module.exports = createCompany;

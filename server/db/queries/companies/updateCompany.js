const { companyValues } = require('./constants');
const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');

const updateCompany = async ({ id, ...restProps }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: restProps,
    tableParameters: companyValues,
  });

  const queryText = `UPDATE companies
    SET (${parameters})
    = (${substitution})
    WHERE id = '${id}'
  `;
  await singleQuery({ queryText, values });
};

module.exports = updateCompany;

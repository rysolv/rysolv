const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');
const { contributorValues } = require('./constants');

// CREATE single contributor
const createContributor = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: contributorValues,
  });
  const queryText = `
    INSERT INTO contributors(${parameters})
    VALUES(${substitution})
  `;
  await singleQuery({ queryText, values });
};

module.exports = createContributor;

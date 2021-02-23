const { formatParameters } = require('../../helpers');
const { repoReturnValues, repoValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// TRANSFORM single Repo
const transformRepo = async ({ data, repoId }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: repoValues,
  });
  const queryText = `
      UPDATE organizations
      SET (${parameters})
      = (${substitution})
      WHERE id = '${repoId}'
      RETURNING ${repoReturnValues}`;
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = transformRepo;

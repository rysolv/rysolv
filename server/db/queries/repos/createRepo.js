const { formatParameters } = require('../../helpers');
const { repoReturnValues, repoValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// Create new repo
const createRepo = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: repoValues,
  });
  const queryText = `INSERT INTO
    repos(${parameters})
    VALUES(${substitution})
    RETURNING ${repoReturnValues}`;

  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = createRepo;

const { formatParameters } = require('../../helpers');
const { issueValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// Create new Issue
const createIssue = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: issueValues,
  });

  const queryText = `INSERT INTO
    issues(${parameters})
    VALUES(${substitution})
    RETURNING *`;
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = createIssue;

const { formatParamaters } = require('../../helpers');
const { issueValues } = require('./constants');
const { mapValues } = require('../../baseQueries');

// Create new Issue
const createIssue = async data => {
  const { parameters, substitution, values } = formatParamaters(
    issueValues,
    data,
  );

  const queryText = `INSERT INTO
    issues(${parameters})
    VALUES(${substitution})
    returning *`;
  const result = await mapValues(queryText, [values]);
  return result;
};

module.exports = createIssue;

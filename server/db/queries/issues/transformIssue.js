const { formatParameters } = require('../../helpers');
const { issueReturnValues, issueValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// TRANSFORM single issue
const transformIssue = async ({ data, issueId }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: issueValues,
  });
  const queryText = `UPDATE issues
      SET (${parameters})
      = (${substitution})
      WHERE id = '${issueId}'
      RETURNING ${issueReturnValues}`;
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = transformIssue;

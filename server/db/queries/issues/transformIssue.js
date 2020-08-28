const { formatParameters } = require('../../helpers');
const { issueReturnValues, issueValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// TRANSFORM single issue
const transformIssue = async (id, data) => {
  try {
    const { parameters, substitution, values } = formatParameters({
      newObject: data,
      tableParameters: issueValues,
    });
    const queryText = `UPDATE issues
      SET (${parameters})
      = (${substitution})
      WHERE id = '${id}'
      RETURNING ${issueReturnValues}`;
    const { rows } = await singleQuery({ queryText, values });
    const [oneRow] = rows;
    return oneRow;
  } catch (error) {
    throw new Error(`Failed to update issue.`);
  }
};

module.exports = transformIssue;

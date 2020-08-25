const { formatParamaters } = require('../../helpers');
const { issueReturnValues, issueValues } = require('./constants');
const { singleItem, mapValues } = require('../../baseQueries');

// TRANSFORM single issue
const transformIssue = async (id, data) => {
  const [rows] = await singleItem('issues', id, issueValues);
  if (rows) {
    const { parameters, substitution, values } = formatParamaters(
      issueValues,
      data,
    );
    const queryText = `UPDATE issues
      SET (${parameters})
      = (${substitution})
      WHERE (id = '${id}')
      RETURNING ${issueReturnValues}`;
    const [result] = await mapValues(queryText, [values]);
    return result;
  }
  throw new Error(`Failed to update. ID not found in issues`);
};

module.exports = transformIssue;

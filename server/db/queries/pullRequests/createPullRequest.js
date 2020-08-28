const { formatParameters } = require('../../helpers');
const { pullRequestReturnValues, pullRequestValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

const createPullRequest = async data => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: pullRequestValues,
  });
  const queryText = `
    INSERT INTO
    pullRequests(${parameters})
    VALUES(${substitution})
    returning ${pullRequestReturnValues}
  `;
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = createPullRequest;

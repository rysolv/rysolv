const { formatParamaters } = require('../../helpers');
const { mapValues } = require('../../baseQueries');
const { pullRequestReturnValues, pullRequestValues } = require('./constants');

const createPullRequest = async data => {
  const { parameters, substitution, values } = formatParamaters(
    pullRequestValues,
    data,
  );
  const queryText = `INSERT INTO
    pullRequests(${parameters})
    VALUES(${substitution})
    returning ${pullRequestReturnValues}`;
  const [result] = await mapValues(queryText, [values]);
  return result;
};

module.exports = createPullRequest;

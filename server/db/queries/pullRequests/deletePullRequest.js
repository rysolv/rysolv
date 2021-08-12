const { singleQuery } = require('../../baseQueries');

const deletePullRequest = async ({ pullRequestId }) => {
  const queryText = `
    UPDATE pullrequests
    SET is_deleted = true
    WHERE pullrequest_id = $1
    RETURNING *
  `;
  const { rows } = await singleQuery({ queryText, values: [pullRequestId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = deletePullRequest;

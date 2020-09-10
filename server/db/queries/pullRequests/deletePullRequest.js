const { singleQuery } = require('../../baseQueries');

const deletePullRequest = async ({ pullRequestId }) => {
  try {
    const queryText = `
      DELETE FROM pullrequests
      WHERE pullrequest_id = $1
      RETURNING *
    `;
    const { rows } = await singleQuery({ queryText, values: [pullRequestId] });
    const [oneRow] = rows;
    return oneRow;
  } catch (error) {
    throw new Error(`Failed to delete pull request.`);
  }
};

module.exports = deletePullRequest;

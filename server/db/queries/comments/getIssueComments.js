const { commentReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all comments on an issue
const getIssueComments = async ({ issueId }) => {
  const queryText = `
    SELECT ${commentReturnValues}
    FROM comments
    JOIN users ON (comments.user_id = users.id)
    WHERE comments.target = $1`;
  const { rows } = await singleQuery({ queryText, values: [issueId] });
  return rows;
};

module.exports = getIssueComments;

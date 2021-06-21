// Get all users watching an issue
const { singleQuery } = require('../../baseQueries');

// GET all issues
const getIssueAttemptList = async ({ issueId }) => {
  const queryText = `
    SELECT users.id, users.profile_pic AS "profilePic", users.username
    FROM attempting
    JOIN users on users.id = attempting.user_id
    WHERE attempting.issue_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [issueId] });
  return rows;
};

module.exports = getIssueAttemptList;

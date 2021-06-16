// Get all users watching an issue
const { singleQuery } = require('../../baseQueries');

// GET all issues
const getIssueWatchList = async ({ issueId }) => {
  const queryText = `
    SELECT users.id, users.profile_pic AS "profilePic", users.username
    FROM watching
    JOIN users on users.id = watching.user_id
    WHERE watching.issue_id = $1
    AND users.is_deleted = false
  `;
  const { rows } = await singleQuery({ queryText, values: [issueId] });
  return rows;
};

module.exports = getIssueWatchList;

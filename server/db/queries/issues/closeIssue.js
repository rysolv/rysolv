const { singleQuery } = require('../../baseQueries');

// @TODO: Break out into seperate close issue / open issue queries

// Close single issue
const closeIssue = async ({ issueId, shouldClose }) => {
  const queryText = `
    UPDATE issues
    SET open = $1
    WHERE id = $2
  `;
  await singleQuery({ queryText, values: [!shouldClose, issueId] });
};

module.exports = closeIssue;

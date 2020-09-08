const { singleQuery } = require('../../baseQueries');

// @TODO: Break out into seperate close issue / open issue queries

// Close single issue
const closeIssue = async ({ issueId, shouldClose }) => {
  try {
    const queryText = `
      UPDATE issues
      SET open = $1
      WHERE id = $2
    `;
    await singleQuery({ queryText, values: [!shouldClose, issueId] });
    return `Issue has been successfully ${
      shouldClose ? 'closed' : 'reopened'
    }.`;
  } catch (error) {
    throw new Error(`Failed to close issue.`);
  }
};

module.exports = closeIssue;

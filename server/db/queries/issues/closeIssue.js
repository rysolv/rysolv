const { singleQuery } = require('../../baseQueries');

// TODO: Break out into seperate close issue / open issue queries

// Close single issue
const closeIssue = async ({ issueId, shouldClose }) => {
  try {
    const queryText = `UPDATE issues SET open=${!shouldClose} WHERE id='${issueId}'`;
    await singleQuery({ queryText });
    return `Issue ${issueId} has been successfully ${
      shouldClose ? 'closed' : 'reopened'
    }.`;
  } catch (error) {
    throw new Error(`Failed to close issue. ID not found in issues`);
  }
};

module.exports = closeIssue;

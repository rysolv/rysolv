const { singleItem, singleQuery } = require('../../baseQueries');

// Close single issue
const closeIssue = async (id, shouldClose) => {
  const rows = await singleItem('issues', id);
  if (rows) {
    const queryText = `UPDATE issues SET open=${!shouldClose} WHERE (id='${id}')`;
    await singleQuery(queryText);
    return `Issue ${id} has been successfully ${
      shouldClose ? 'closed' : 'reopened'
    }.`;
  }
  throw new Error(`Failed to close issue. ID not found in issues`);
};

module.exports = closeIssue;

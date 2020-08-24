const { singleItem, singleQuery } = require('../../baseQueries');

const deletePullRequest = async id => {
  const [rows] = await singleItem('pullRequests', id, '*', 'pullrequest_id');
  if (rows) {
    const queryText = `DELETE FROM pullrequests WHERE (pullrequest_id='${id}')`;
    await singleQuery({ queryText });
    return rows;
  }
  throw new Error(
    `Failed to delete pull request. ID not found in Pull Requests`,
  );
};

module.exports = deletePullRequest;

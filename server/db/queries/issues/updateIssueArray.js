const { singleItem, singleQuery } = require('../../baseQueries');

const updateIssueArray = async ({ column, issueId, data, remove }) => {
  const [issueData] = await singleItem('issues', issueId);
  // Only add unique values to array
  if (!issueData[column].includes(data) || remove) {
    if (remove) {
      const queryText = `UPDATE issues
      SET ${column} = array_remove(${column}, '${data}')
      WHERE (id = '${issueId}')
      RETURNING *`;
      const { rows } = await singleQuery({ queryText });
      const [oneRow] = rows;
      return oneRow;
    }
    const queryText = `UPDATE issues
      SET ${column} = array_append(${column}, '${data}')
      WHERE (id = '${issueId}')
      RETURNING *`;
    const { rows } = await singleQuery({ queryText });
    const [oneRow] = rows;
    return oneRow;
  }
  return issueData;
};

module.exports = updateIssueArray;

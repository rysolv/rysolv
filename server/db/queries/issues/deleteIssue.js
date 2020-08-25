const { singleQuery, singleItem } = require('../../baseQueries');

// DELETE single issue
const deleteIssue = async id => {
  const rows = await singleItem('issues', id);
  if (rows) {
    const queryText = `DELETE FROM issues WHERE (id='${id}') RETURNING *`;
    await singleQuery({ queryText });
    return `ID ${id} successfully deleted from table issues`;
  }
  throw new Error(`Failed to delete issue. ID not found in issues`);
};

module.exports = deleteIssue;

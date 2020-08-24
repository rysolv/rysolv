const { singleItem, singleQuery } = require('../../baseQueries');

// DELETE single organization
const deleteOrganization = async id => {
  const rows = await singleItem('organizations', id);
  if (rows) {
    const queryText = `DELETE FROM organizations WHERE (id='${id}') RETURNING *`;
    const {
      rows: [resultRow],
    } = await singleQuery(queryText);
    const { name } = resultRow;
    return `${name} was successfully deleted from organizations.`;
  }
  throw new Error(
    `Failed to delete organization. ID not found in organizations`,
  );
};

module.exports = deleteOrganization;

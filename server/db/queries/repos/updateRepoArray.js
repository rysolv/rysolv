const { singleQuery } = require('../../baseQueries');

// @TODO: remove this query entirely. Refactor getRepos to join issues
// ADD to repo array
const updateRepoArray = async ({ column, data, id, remove }) => {
  const action = remove ? 'array_remove' : 'array_append';
  const queryText = `UPDATE repos
    SET ${column} = ${action}(${column}, '${data}')
    WHERE (id = '${id}')
    RETURNING *`;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = updateRepoArray;

const { groupValues, repoReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// Search repos by a single column
const getReposWhere = async ({ column, value }) => {
  const queryText = `
    SELECT ${repoReturnValues} FROM repos
      LEFT JOIN languages ON languages.repo_id = repos.id
    WHERE ${column} = $1
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({
    queryText,
    values: [value],
  });
  return rows;
};

module.exports = getReposWhere;

const { groupValues, repoReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all repos
const getRepos = async () => {
  const queryText = `
    SELECT
      ${repoReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages"
    FROM repos
    LEFT JOIN languages ON languages.repo_id = repos.id
    WHERE repos.is_deleted = false
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getRepos;

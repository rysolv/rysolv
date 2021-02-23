const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// SEARCH repos
const searchRepos = async ({ value }) => {
  const queryText = `
    SELECT ${organizationReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages"
    FROM repos
      LEFT JOIN languages ON languages.repo_id = repos.id
    WHERE
      repos.is_deleted = false AND
      (
        LOWER(repos.name) LIKE LOWER('%'||$1||'%') OR
        LOWER(repos.description) LIKE LOWER('%'||$1||'%')
      )
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [value] });
  return rows;
};

module.exports = searchRepos;

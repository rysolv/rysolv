const { groupValues, repoReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single repo
const getOneRepo = async ({ repoId }) => {
  const queryText = `
    SELECT
      ${repoReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages"
    FROM repos
      LEFT JOIN languages ON languages.organization_id = repos.id
    WHERE repos.id = $1
    AND repos.is_deleted = false
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [repoId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneRepo;

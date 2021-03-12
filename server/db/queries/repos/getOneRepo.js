const { groupValues, repoReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single repo
const getOneRepo = async ({ repoId }) => {
  const queryText = `
    SELECT
      ${repoReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
      (SELECT COALESCE(SUM(funded_amount),0) FROM payments WHERE repo_id = $1) as "totalFunded"
    FROM repos
    LEFT JOIN languages ON languages.repo_id = repos.id
    WHERE repos.id = $1
    AND repos.is_deleted = false
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [repoId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneRepo;

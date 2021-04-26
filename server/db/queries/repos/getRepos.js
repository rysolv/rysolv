const { groupValues, repoReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all repos
const getRepos = async () => {
  const queryText = `
    SELECT
      ${repoReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(l.language), NULL) AS "preferredLanguages",
      COALESCE(SUM(payments.funded_amount),0) AS "totalFunded"
    FROM repos
      LEFT JOIN (
        select l.repo_id,
        l.language as language
        from languages l
        group by repo_id, language
      ) l on l.repo_id = repos.id
    LEFT JOIN payments on payments.repo_id = repos.id
    WHERE repos.is_deleted = false
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getRepos;

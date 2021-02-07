const { singleQuery } = require('../../baseQueries');

const getFilterOptions = async () => {
  const queryText = `
    SELECT
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE issue_id IS NOT NULL) AS "issueLanguages",
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE user_id IS NOT NULL) AS "userLanguages",
    (SELECT COUNT(*) FROM issues WHERE open = true AND funded_amount = 0) AS "unfundedIssues",
    (SELECT COALESCE(ARRAY_AGG(name), '{}') from organizations WHERE is_deleted = false) AS organizations,
    (SELECT COUNT(*) FROM issues WHERE open = false AND is_deleted = false) AS "closedIssues",
    (SELECT COUNT(*) FROM issues WHERE funded_amount > 0 AND open = true AND is_deleted = false) AS "fundedIssues",
    (SELECT MAX(funded_amount) FROM issues where is_deleted = false) AS "maxBounty",
    (SELECT COUNT(*) FROM issues WHERE type = 'Feature' and is_deleted = false) AS "featureTag",
    (SELECT COUNT(*) FROM issues WHERE type = 'Bug' and is_deleted = false) AS "bugTag"
  `;
  const { rows } = await singleQuery({ queryText });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getFilterOptions;

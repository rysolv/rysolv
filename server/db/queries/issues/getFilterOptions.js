const { singleQuery } = require('../../baseQueries');

const getFilterOptions = async () => {
  const queryText = `
    SELECT
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE issue_id IS NOT NULL) AS "issueLanguages",
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE user_id IS NOT NULL) AS "userLanguages",
    (SELECT COUNT(*) FROM issues WHERE funded_amount = 0 AND is_deleted = false AND open = true) AS "unfundedIssues",
    (SELECT COALESCE(ARRAY_AGG(name), '{}') from organizations WHERE is_deleted = false) AS organizations,
    (SELECT COUNT(*) FROM issues WHERE is_deleted = false AND open = false) AS "closedIssues",
    (SELECT COUNT(*) FROM issues WHERE funded_amount > 0 AND is_deleted = false AND open = true) AS "fundedIssues",
    (SELECT MAX(funded_amount) FROM issues WHERE is_deleted = false) AS "maxBounty",
    (SELECT COUNT(*) FROM issues WHERE is_deleted = false AND type = 'Feature') AS "featureTag",
    (SELECT COUNT(*) FROM issues WHERE is_deleted = false AND type = 'Bug') AS "bugTag"
  `;
  const { rows } = await singleQuery({ queryText });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getFilterOptions;

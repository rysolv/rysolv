const { singleQuery } = require('../../baseQueries');

const getFilterOptions = async () => {
  const queryText = `
    SELECT
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE issue_id IS NOT NULL) AS "issueLanguages",
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE user_id IS NOT NULL) AS "userLanguages",
    (SELECT COUNT(*) FROM issues WHERE open = true AND funded_amount = 0) AS "unfundedIssues",
    (SELECT COALESCE(ARRAY_AGG(name), '{}') from organizations) AS organizations,
    (SELECT COUNT(*) FROM issues WHERE open = false) AS "closedIssues",
    (SELECT COUNT(*) FROM issues WHERE funded_amount > 0 AND open = true) AS "fundedIssues",
    (SELECT MAX(funded_amount) FROM issues) AS "maxBounty",
    (SELECT COUNT(*) FROM issues WHERE type = 'Feature') AS "featureTag",
    (SELECT COUNT(*) FROM issues WHERE type = 'Bug') AS "bugTag"
  `;
  const { rows } = await singleQuery({ queryText });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getFilterOptions;

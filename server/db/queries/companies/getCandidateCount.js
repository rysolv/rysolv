const { singleQuery } = require('../../baseQueries');

const getCandidateCount = async ({ positionId }) => {
  const queryText = `
    SELECT
      (SELECT CASE WHEN cp.applied_date IS NOT NULL THEN true ELSE false END AS "hasApplied"),
      (SELECT CASE WHEN cp.saved_date IS NOT NULL THEN true ELSE false END AS "isSaved"),
      cp.user_id AS "userId"
    FROM candidate_positions cp 
    WHERE cp.position_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [positionId] });
  return rows;
};

module.exports = getCandidateCount;

const { singleQuery } = require('../../baseQueries');
const setPositionAppliedDate = async ({ candidateId, positionId }) => {
  const queryText = `
    UPDATE candidate_positions
    SET applied_date = now()
    WHERE user_id = $1
    AND position_id = $2
  `;

  await singleQuery({
    queryText,
    values: [candidateId, positionId],
  });
};

module.exports = setPositionAppliedDate;

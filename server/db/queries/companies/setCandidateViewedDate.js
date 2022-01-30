const { singleQuery } = require('../../baseQueries');

const setCandidateViewedDate = async ({ positionId, step }) => {
  let filter = '';
  if (step === 'applied') filter = 'AND applied_date IS NOT NULL';
  if (step === 'all') filter = 'AND applied_date IS NULL';

  const queryText = `
    UPDATE candidate_positions
    SET viewed_date = now()
    WHERE position_id = $1
    ${filter}
  `;

  await singleQuery({
    queryText,
    values: [positionId],
  });
};

module.exports = setCandidateViewedDate;

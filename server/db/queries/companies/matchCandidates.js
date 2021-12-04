const { singleQuery } = require('../../baseQueries');

const matchCandidates = async ({ positionId, userId }) => {
  const queryText = `
    WITH matching_users AS (
      SELECT id FROM users
      WHERE is_deleted = false
      AND id != $2
      LIMIT 10
    )
    INSERT INTO candidate_positions(
      percent_match,
      position_id,
      user_id
    )
    SELECT
      (random() * 50 + 50)::int,
      $1,
      id
    FROM matching_users
  `;

  await singleQuery({
    queryText,
    values: [positionId, userId],
  });
};

module.exports = matchCandidates;

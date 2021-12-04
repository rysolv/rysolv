const { singleQuery } = require('../../baseQueries');

const matchCandidates = async ({ positionId }) => {
  const queryText = `
    WITH matching_users AS (
      SELECT ID FROM users
      WHERE is_deleted = false
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

  const { rows } = await singleQuery({ queryText, values: [positionId] });
  return rows;
};

module.exports = matchCandidates;

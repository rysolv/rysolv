const { singleQuery } = require('../../baseQueries');

const matchCandidates = async ({ positionId, userId }) => {
  const queryText = `
    WITH matching_users AS (
      SELECT distinct on (u.id) u.id FROM users u
	    JOIN user_question_responses uqr ON uqr.user_id = u.id
	    WHERE u.is_deleted = false
	    AND u.id != $2
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

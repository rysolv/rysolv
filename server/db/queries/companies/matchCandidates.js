const { singleQuery } = require('../../baseQueries');

const matchCandidates = async ({ candidates, positionId }) => {
  const deleteQuery = `
    DELETE FROM candidate_positions
    WHERE position_id = $1
    AND applied_date IS NULL
    AND saved_date IS NULL;
  `;

  const insertQuery = `
    INSERT INTO candidate_positions(
      match_criteria,
      position_id,
      percent_match,
      user_id
    )
    SELECT
      (candidates ->> 'matchCriteria')::jsonb as match_criteria,
      $2 as position_id,
      (candidates ->> 'percentMatch')::double precision as percent_match,
      (candidates ->> 'id')::uuid as user_id
    FROM jsonb_array_elements($1) candidates
    ON CONFLICT (user_id, position_id)
    DO UPDATE SET
      match_criteria = EXCLUDED.match_criteria,
      percent_match = EXCLUDED.percent_match;
  `;

  await singleQuery({
    queryText: deleteQuery,
    values: [positionId],
  });

  await singleQuery({
    queryText: insertQuery,
    values: [JSON.stringify(candidates), positionId],
  });
};

module.exports = matchCandidates;

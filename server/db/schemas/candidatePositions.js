const alterCandidatePositionsTable = `
  ALTER TABLE candidate_positions
  ADD COLUMN match_criteria JSONB,
  ADD COLUMN created_date TIMESTAMP DEFAULT now(),
  ADD COLUMN percent_match FLOAT,
  ADD COLUMN position_id UUID REFERENCES company_positions(id),
  ADD COLUMN saved BOOLEAN DEFAULT false,
  ADD COLUMN user_id UUID REFERENCES users(id);

  CREATE UNIQUE INDEX user_position_index ON candidate_positions(position_id, user_id);
`;

const createCandidatePositionsTable = `
  CREATE TABLE IF NOT EXISTS
  candidate_positions(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = {
  alterCandidatePositionsTable,
  createCandidatePositionsTable,
};

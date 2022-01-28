const alterCandidatePositionsTable = `
  ALTER TABLE candidate_positions
  ADD COLUMN applied_date TIMESTAMP DEFAULT NULL,
  ADD COLUMN created_date TIMESTAMP DEFAULT now(),
  ADD COLUMN match_criteria JSONB,
  ADD COLUMN percent_match FLOAT,
  ADD COLUMN position_id UUID REFERENCES company_positions(id),
  ADD COLUMN saved_date TIMESTAMP DEFAULT NULL,
  ADD COLUMN user_id UUID REFERENCES users(id);
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

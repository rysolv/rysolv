const alterCandidatePositionsTable = `
  ALTER TABLE candidate_positions
  ADD COLUMN candidate_id UUID REFERENCES users(id),
  ADD COLUMN percent_match FLOAT,
  ADD COLUMN position_id UUID REFERENCES company_positions(id)
`;

const createCandidatePositionsTable = `
  CREATE TABLE IF NOT EXISTS
  candidate_positions(
    id UUID PRIMARY KEY
  )
`;

module.exports = {
  alterCandidatePositionsTable,
  createCandidatePositionsTable,
};

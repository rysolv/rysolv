const alterPositionTechStackTable = `
  ALTER TABLE position_tech_stack
  ADD COLUMN level INT,
  ADD COLUMN technology VARCHAR(32),
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createPositionTechStackTable = `
  CREATE TABLE IF NOT EXISTS
  position_tech_stack(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterPositionTechStackTable, createPositionTechStackTable };

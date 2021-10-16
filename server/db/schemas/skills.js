const alterSkillsTable = `
  ALTER TABLE skills
  ADD COLUMN is_framework BOOLEAN DEFAULT false,
  ADD COLUMN is_language BOOLEAN DEFAULT false,
  ADD COLUMN name VARCHAR(32),
  ADD COLUMN short_name VARCHAR(32)
`;

const createSkillsTable = `
  CREATE TABLE IF NOT EXISTS skills(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterSkillsTable, createSkillsTable };

const alterTechnologiesTable = `
  ALTER TABLE technologies
  ADD COLUMN is_framework BOOLEAN DEFAULT false,
  ADD COLUMN is_language BOOLEAN DEFAULT false,
  ADD COLUMN name VARCHAR(32),
  ADD COLUMN short_name VARCHAR(32)
`;

const createTechnologiesTable = `
  CREATE TABLE IF NOT EXISTS technologies(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterTechnologiesTable, createTechnologiesTable };

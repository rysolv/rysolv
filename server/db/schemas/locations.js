const alterLocationsTable = `
  ALTER TABLE locations
  ADD COLUMN company_id UUID REFERENCES companies(id) UNIQUE,
  ADD COLUMN country VARCHAR(32),
  ADD COLUMN country_code VARCHAR(5),
  ADD COLUMN formatted_address VARCHAR(64),
  ADD COLUMN position_id UUID REFERENCES company_positions(id) UNIQUE,
  ADD COLUMN user_id UUID REFERENCES users(id) UNIQUE,
  ADD COLUMN utc_offset_minutes SMALLINT;
`;

const createLocationsTable = `
  CREATE TABLE IF NOT EXISTS
  locations(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterLocationsTable, createLocationsTable };

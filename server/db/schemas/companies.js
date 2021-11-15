const alterCompaniesTable = `
  ALTER TABLE companies
  ADD COLUMN company_name VARCHAR(64),
  ADD COLUMN company_url VARCHAR(128),
  ADD COLUMN contract_accepted_date TIMESTAMP,
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN description TEXT,
  ADD COLUMN location VARCHAR(128),
  ADD COLUMN logo VARCHAR(256),
  ADD COLUMN size INT
`;

const createCompaniesTable = `
  CREATE TABLE IF NOT EXISTS
  companies(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterCompaniesTable, createCompaniesTable };

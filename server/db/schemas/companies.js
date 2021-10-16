const alterCompaniesTable = `
  ALTER TABLE companies
  ADD COLUMN company_name VARCHAR(64) NOT NULL,
  ADD COLUMN company_url VARCHAR(128),
  ADD COLUMN contract_accepted_date TIMESTAMP DEFAULT NULL,
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN description TEXT,
  ADD COLUMN headquarter_location VARCHAR(128),
  ADD COLUMN size INT
`;

const createCompaniesTable = `
  CREATE TABLE IF NOT EXISTS
  companies(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterCompaniesTable, createCompaniesTable };

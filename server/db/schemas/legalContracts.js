const alterLegalContractsTable = `
  ALTER TABLE legal_contacts
  ADD COLUMN body TEXT NOT NULL,
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN title VARCHAR(64) NOT NULL,
  ADD COLUMN version INT NOT NULL
`;

const createLegalContractsTable = `
  CREATE TABLE IF NOT EXISTS
  legal_contacts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterLegalContractsTable, createLegalContractsTable };

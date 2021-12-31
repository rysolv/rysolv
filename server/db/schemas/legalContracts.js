const alterLegalContractsTable = `
  ALTER TABLE legal_contracts
  ADD COLUMN body TEXT NOT NULL,
  ADD COLUMN contract_key VARCHAR(32),
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN subtitle VARCHAR(512),
  ADD COLUMN title VARCHAR(64) NOT NULL,
  ADD COLUMN version INT NOT NULL
`;

const createLegalContractsTable = `
  CREATE TABLE IF NOT EXISTS
  legal_contracts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterLegalContractsTable, createLegalContractsTable };

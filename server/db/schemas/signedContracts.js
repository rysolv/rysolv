const alterSignedContractsTable = `
  ALTER TABLE signed_contracts
  ADD COLUMN company_id UUID REFERENCES companies(id),
  ADD COLUMN contract_id UUID REFERENCES legal_contracts(id),
  ADD COLUMN created_date TIMESTAMP
`;

const createSignedContractsTable = `
  CREATE TABLE IF NOT EXISTS signed_contracts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterSignedContractsTable, createSignedContractsTable };

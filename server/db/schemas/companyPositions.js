const alterCompanyPositionsTable = `
  ALTER TABLE company_positions
  ADD COLUMN company_id UUID REFERENCES companies(id)
`;

const createCompanyPositionsTable = `
  CREATE TABLE IF NOT EXISTS
  company_positions(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterCompanyPositionsTable, createCompanyPositionsTable };

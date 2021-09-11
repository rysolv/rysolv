const alterCompanyPositionsTable = `
  ALTER TABLE company_positions
  ADD COLUMN company_id UUID REFERENCES companies(id),
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN duration VARCHAR(10),
  ADD COLUMN experience INT,
  ADD COLUMN hiring_timeframe VARCHAR(10),
  ADD COLUMN location VARCHAR(128),
  ADD COLUMN role VARCHAR(64),
  ADD COLUMN type VARCHAR(10)
`;

const createCompanyPositionsTable = `
  CREATE TABLE IF NOT EXISTS
  company_positions(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterCompanyPositionsTable, createCompanyPositionsTable };

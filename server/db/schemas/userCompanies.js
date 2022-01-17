const alterUserCompaniesTable = `
  ALTER TABLE user_companies
  ADD COLUMN company_id UUID REFERENCES companies(id),
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createUserCompaniesTable = `
  CREATE TABLE IF NOT EXISTS
  user_companies(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterUserCompaniesTable, createUserCompaniesTable };

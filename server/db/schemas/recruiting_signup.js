const alterRecruitingTable = `
  ALTER TABLE recruiting_signup
  ADD COLUMN company_name VARCHAR(128),
  ADD COLUMN company_url VARCHAR(128),
  ADD COLUMN contact_email VARCHAR(128),
  ADD COLUMN contact_name VARCHAR(64),
  ADD COLUMN created_date TIMESTAMP
`;

const createRecruitingTable = `
  CREATE TABLE IF NOT EXISTS recruiting_signup (
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterRecruitingTable, createRecruitingTable };

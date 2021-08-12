const alterFundingTable = `
  ALTER TABLE funding
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN funded_amount FLOAT,
  ADD COLUMN is_approved BOOLEAN DEFAULT false,
  ADD COLUMN issue_id UUID REFERENCES issues(id),
  ADD COLUMN paid_to_repo BOOLEAN DEFAULT false,
  ADD COLUMN paid_to_repo_date TIMESTAMP,
  ADD COLUMN pullrequest_id UUID REFERENCES pullrequests(pullrequest_id),
  ADD COLUMN rep SMALLINT,
  ADD COLUMN repo_payout FLOAT DEFAULT 0,
  ADD COLUMN user_accepted BOOLEAN DEFAULT FALSE,
  ADD COLUMN user_accepted_date TIMESTAMP,
  ADD COLUMN user_id UUID REFERENCES users(id),
  ADD COLUMN user_payout FLOAT DEFAULT 0
`;

const createFundingsTable = `
  CREATE TABLE IF NOT EXISTS
  funding(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterFundingTable, createFundingsTable };

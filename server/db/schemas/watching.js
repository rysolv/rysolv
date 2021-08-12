const alterWatchingTable = `
  ALTER TABLE watching
  ADD COLUMN issue_id UUID REFERENCES issues(id),
  ADD COLUMN user_id UUID REFERENCES users(id),
  ADD PRIMARY KEY (issue_id, user_id)
`;

const createWatchingTable = `
  CREATE TABLE IF NOT EXISTS watching()
`;

module.exports = { alterWatchingTable, createWatchingTable };

const alterAttemptingTable = `ALTER TABLE attempting
ADD COLUMN issue_id UUID REFERENCES issues(id),
ADD COLUMN user_id UUID REFERENCES users(id),
ADD PRIMARY KEY (issue_id, user_id)`;

const createAttemptingTable = `CREATE TABLE IF NOT EXISTS attempting()`;

module.exports = { alterAttemptingTable, createAttemptingTable };

const alterActivityTable = `ALTER TABLE activity
ADD COLUMN action_type VARCHAR(128) NOT NULL,
ADD COLUMN created_date TIMESTAMP,
ADD COLUMN funded_value FLOAT DEFAULT 0,
ADD COLUMN is_private BOOLEAN DEFAULT false,
ADD COLUMN issue_id UUID REFERENCES issues(id),
ADD COLUMN pullrequest_id UUID REFERENCES pullRequests(pullrequest_id),
ADD COLUMN repo_id UUID REFERENCES repos(id),
ADD COLUMN user_id UUID REFERENCES users(id)`;

const createActivityTable = `CREATE TABLE IF NOT EXISTS
activity(
  activity_id UUID PRIMARY KEY
)`;

module.exports = { alterActivityTable, createActivityTable };

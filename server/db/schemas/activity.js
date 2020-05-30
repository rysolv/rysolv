const activity = `CREATE TABLE IF NOT EXISTS
activity(
  action VARCHAR(128) NOT NULL,
  activity_id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  issue_id UUID REFERENCES issues(id),
  organization_id UUID REFERENCES organizations(id),
  pr_id UUID REFERENCES pullRequests(id),
  user_id UUID REFERENCES users(id),
  value FLOAT DEFAULT 0
)`;

module.exports = activity;

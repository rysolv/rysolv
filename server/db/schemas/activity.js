const activity = `CREATE TABLE IF NOT EXISTS
activity(
  activity_id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  issue_id UUID REFERENCES issues(id),
  action VARCHAR(128) NOT NULL
  value FLOAT DEFAULT 0,
)`;

module.exports = activity;

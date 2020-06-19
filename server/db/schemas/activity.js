const activity = `CREATE TABLE IF NOT EXISTS
activity(
  action_type VARCHAR(128) NOT NULL,
  activity_id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  funded_value FLOAT DEFAULT 0,
  issue_id UUID REFERENCES issues(id),
  organization_id UUID REFERENCES organizations(id),
  pullrequest_id UUID REFERENCES pullRequests(pullrequest_id),
  user_id UUID REFERENCES users(id)
)`;

module.exports = activity;

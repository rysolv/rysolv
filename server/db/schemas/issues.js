const issues = `CREATE TABLE IF NOT EXISTS
issues(
  attempting UUID [],
  body TEXT NOT NULL,
  comments UUID [],
  contributor_id UUID REFERENCES users(id),
  created_date TIMESTAMP,
  funded_amount FLOAT DEFAULT 0,
  id UUID PRIMARY KEY,
  language VARCHAR(128) [],
  modified_date TIMESTAMP,
  name VARCHAR(256) NOT NULL,
  open BOOLEAN DEFAULT true,
  organization_id UUID REFERENCES organizations(id),
  pull_requests UUID [] DEFAULT '{}',
  rep SMALLINT DEFAULT 25,
  repo VARCHAR(128) NOT NULL,
  type VARCHAR(40) NOT NULL
)`;

module.exports = issues;

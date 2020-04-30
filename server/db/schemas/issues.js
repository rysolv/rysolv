const issues = `CREATE TABLE IF NOT EXISTS
issues(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  organization_id UUID,
  name VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  repo VARCHAR(128) NOT NULL,
  language VARCHAR(128) [],
  comments UUID [],
  attempting UUID [],
  contributor UUID [],
  rep SMALLINT DEFAULT 25,
  watching UUID [],
  value FLOAT DEFAULT 0,
  open BOOLEAN DEFAULT true
)`;

module.exports = issues;

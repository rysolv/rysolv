const issues = `CREATE TABLE IF NOT EXISTS
issues(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  organization_ID UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  repo VARCHAR(128) NOT NULL,
  language VARCHAR(128),
  comments TEXT [],
  attempts SMALLINT DEFAULT 0,
  active_attempts SMALLINT DEFAULT 0,
  contributor UUID [],
  rep SMALLINT DEFAULT 25,
  watch_list UUID [],
  value SMALLINT DEFAULT 0
)`;

module.exports = issues;

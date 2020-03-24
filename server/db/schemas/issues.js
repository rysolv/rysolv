const issues = `CREATE TABLE IF NOT EXISTS
issues(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  organization VARCHAR(128) NOT NULL,
  name VARCHAR(128) NOT NULL,
  body VARCHAR(128) NOT NULL,
  repo VARCHAR(128) NOT NULL,
  language VARCHAR(128),
  comments text[],
  attempts SMALLINT DEFAULT 0,
  active_attempts SMALLINT DEFAULT 0,
  contributor UUID []
)`;

module.exports = issues;

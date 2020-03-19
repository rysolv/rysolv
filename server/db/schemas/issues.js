const issues = `CREATE TABLE IF NOT EXISTS
issues(
  id UUID PRIMARY KEY,
  createdDate TIMESTAMP,
  modifiedDate TIMESTAMP,
  name VARCHAR(128) NOT NULL,
  body VARCHAR(128) NOT NULL,
  repo VARCHAR(128) NOT NULL
)`;

module.exports = issues;

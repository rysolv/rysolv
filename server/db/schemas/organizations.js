const organizations = `CREATE TABLE IF NOT EXISTS
organizations(
  id UUID PRIMARY KEY,
  createdDate TIMESTAMP,
  modifiedDate TIMESTAMP,
  name VARCHAR(128) NOT NULL,
  description VARCHAR(128) NOT NULL,
  repo VARCHAR(128) NOT NULL
)`;

module.exports = organizations;

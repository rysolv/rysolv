const organizations = `CREATE TABLE IF NOT EXISTS
organizations(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  name VARCHAR(128) NOT NULL,
  description VARCHAR(128) NOT NULL,
  repo VARCHAR(128) NOT NULL
)`;

module.exports = organizations;

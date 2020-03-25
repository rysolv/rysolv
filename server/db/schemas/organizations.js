const organizations = `CREATE TABLE IF NOT EXISTS
organizations(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  name VARCHAR(128) NOT NULL,
  description VARCHAR(128) NOT NULL,
  repo_url VARCHAR(128) NOT NULL,
  website VARCHAR(128),
  issues UUID [],
  logo VARCHAR(128),
  verified BOOLEAN DEFAULT false
)`;

module.exports = organizations;

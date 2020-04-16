const organizations = `CREATE TABLE IF NOT EXISTS
organizations(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  name VARCHAR(128) NOT NULL,
  description VARCHAR(255) NOT NULL,
  repo_url VARCHAR(128) NOT NULL,
  company_url VARCHAR(128),
  issues UUID [],
  logo VARCHAR(255),
  verified BOOLEAN DEFAULT false,
  contributors UUID [],
  owner_id UUID
)`;

module.exports = organizations;

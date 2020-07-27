const organizations = `CREATE TABLE IF NOT EXISTS
organizations(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  name VARCHAR(128) NOT NULL,
  description VARCHAR(512) NOT NULL,
  repo_url VARCHAR(128) NOT NULL,
  organization_url VARCHAR(128),
  issues UUID [],
  logo VARCHAR(256),
  verified BOOLEAN DEFAULT false,
  contributors UUID [],
  owner_id UUID,
  total_funded FLOAT DEFAULT 0,
  preferred_languages VARCHAR(128) []
)`;

module.exports = organizations;

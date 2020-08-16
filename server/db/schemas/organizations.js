const organizations = `CREATE TABLE IF NOT EXISTS
organizations(
  contributors UUID [],
  created_date TIMESTAMP,
  description VARCHAR(512) NOT NULL,
  id UUID PRIMARY KEY,
  is_manual BOOLEAN,
  issues UUID [],
  logo VARCHAR(256),
  modified_date TIMESTAMP,
  name VARCHAR(128) NOT NULL,
  organization_url VARCHAR(128),
  owner_id UUID,
  preferred_languages VARCHAR(128) [],
  repo_url VARCHAR(128) NOT NULL,
  total_funded FLOAT DEFAULT 0,
  verified BOOLEAN DEFAULT false
)`;

module.exports = organizations;

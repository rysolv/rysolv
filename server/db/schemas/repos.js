const alterReposTable = `ALTER TABLE repos
ADD COLUMN created_date TIMESTAMP,
ADD COLUMN description VARCHAR(512) NOT NULL,
ADD COLUMN is_deleted BOOLEAN DEFAULT false,
ADD COLUMN is_manual BOOLEAN,
ADD COLUMN issues UUID [],
ADD COLUMN logo VARCHAR(256),
ADD COLUMN modified_date TIMESTAMP,
ADD COLUMN name VARCHAR(128) NOT NULL,
ADD COLUMN organization_url VARCHAR(128),
ADD COLUMN owner_id UUID,
ADD COLUMN repo_url VARCHAR(128) NOT NULL,
ADD COLUMN total_funded FLOAT DEFAULT 0,
ADD COLUMN verified BOOLEAN DEFAULT false`;

const createReposTable = `CREATE TABLE IF NOT EXISTS
repos(
  id UUID PRIMARY KEY
)`;

module.exports = { alterReposTable, createReposTable };

const alterIssuesTable = `ALTER TABLE issues
ADD COLUMN body TEXT NOT NULL,
ADD COLUMN comments UUID [],
ADD COLUMN contributor_id UUID REFERENCES users(id),
ADD COLUMN created_date TIMESTAMP,
ADD COLUMN funded_amount FLOAT DEFAULT 0,
ADD COLUMN is_funding_paid_out UUID DEFAULT NULL REFERENCES funding(id),
ADD COLUMN is_manual BOOLEAN,
ADD COLUMN language VARCHAR(128) [],
ADD COLUMN modified_date TIMESTAMP,
ADD COLUMN name VARCHAR(256) NOT NULL,
ADD COLUMN open BOOLEAN DEFAULT true,
ADD COLUMN organization_id UUID REFERENCES organizations(id),
ADD COLUMN pull_requests UUID [] DEFAULT '{}',
ADD COLUMN rep SMALLINT DEFAULT 25,
ADD COLUMN repo VARCHAR(128) NOT NULL,
ADD COLUMN type VARCHAR(40) NOT NULL`;

const createIssuesTable = `CREATE TABLE IF NOT EXISTS
issues(
  id UUID PRIMARY KEY
)`;

module.exports = { alterIssuesTable, createIssuesTable };

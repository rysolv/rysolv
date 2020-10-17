const alterContributorsTable = `ALTER TABLE contributors
ADD COLUMN github_id INT,
ADD COLUMN organization_id UUID REFERENCES organizations(id),
ADD PRIMARY KEY (organization_id)`;

const createContributorsTable = `CREATE TABLE IF NOT EXISTS contributors()`;

module.exports = { alterContributorsTable, createContributorsTable };

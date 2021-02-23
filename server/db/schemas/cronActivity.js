const alterCronActivityTable = `ALTER TABLE cronactivity
ADD COLUMN created_date TIMESTAMP,
ADD COLUMN issue_id UUID,
ADD COLUMN pullrequest_id UUID,
ADD COLUMN query TEXT,
ADD COLUMN repo_id UUID,
ADD COLUMN values TEXT []`;

const createCronActivityTable = `CREATE TABLE IF NOT EXISTS
cronactivity(
  id UUID PRIMARY KEY
)`;

module.exports = { alterCronActivityTable, createCronActivityTable };

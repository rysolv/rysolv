const alterHiringActivityTable = `
  ALTER TABLE hiring_activity
  ADD COLUMN activity_type VARCHAR(128) NOT NULL,
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN position_id UUID REFERENCES positions(id),
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createHiringActivityTable = `
  CREATE TABLE IF NOT EXISTS
  hiring_activity(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterHiringActivityTable, createHiringActivityTable };

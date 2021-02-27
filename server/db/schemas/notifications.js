const alterNotificationsTable = `
  ALTER TABLE notifications
  ADD COLUMN body TEXT,
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN email VARCHAR(128),
  ADD COLUMN subject TEXT,
  ADD COLUMN user_id UUID REFERENCES users(id) NOT NULL
`;

const createNotificationsTable = `
  CREATE TABLE IF NOT EXISTS notifications(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterNotificationsTable, createNotificationsTable };

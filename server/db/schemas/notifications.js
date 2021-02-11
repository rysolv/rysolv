const alterNotificationsTable = `
  ALTER TABLE notifications
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN user_id UUID REFERENCES users(id) NOT NULL,
  ADD COLUMN subject TEXT,
  ADD COLUMN body TEXT,
  ADD COLUMN email VARCHAR(128),
  ADD COLUMN method VARCHAR(16)
`;

const createNotificationsTable = `
  CREATE TABLE IF NOT EXISTS notifications(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterNotificationsTable, createNotificationsTable };

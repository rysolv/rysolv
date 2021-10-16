const alterMessagesTable = `
  ALTER TABLE messages
  ADD COLUMN body TEXT NOT NULL,
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN from_user_id UUID REFERENCES users(id),
  ADD COLUMN position_id UUID REFERENCES company_positions(id),
  ADD COLUMN read_date TIMESTAMP DEFAULT NULL,
  ADD COLUMN thread_id UUID,
  ADD COLUMN to_user_id UUID REFERENCES users(id)
`;

const createMessagesTable = `
  CREATE TABLE IF NOT EXISTS
  messages(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterMessagesTable, createMessagesTable };

const alterMessagesTable = `
  ALTER TABLE messages
  ADD COLUMN body TEXT NOT NULL,
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN position_id UUID REFERENCES company_positions(id),
  ADD COLUMN read TIMESTAMP DEFAULT NULL,
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createMessagesTable = `
  CREATE TABLE IF NOT EXISTS
  messages(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterMessagesTable, createMessagesTable };

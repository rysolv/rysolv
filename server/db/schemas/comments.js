const alterCommentsTable = `
  ALTER TABLE comments
  ADD COLUMN body TEXT NOT NULL,
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN modified_date TIMESTAMP,
  ADD COLUMN target UUID NOT NULL,
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createCommentsTable = `
  CREATE TABLE IF NOT EXISTS
  comments(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterCommentsTable, createCommentsTable };

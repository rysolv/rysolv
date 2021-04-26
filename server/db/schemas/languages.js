const alterLanguagesTable = `
  ALTER TABLE languages
  ADD COLUMN issue_id UUID REFERENCES issues(id),
  ADD COLUMN language VARCHAR(64),
  ADD COLUMN preferred BOOLEAN DEFAULT false,
  ADD COLUMN repo_id UUID REFERENCES repos(id),
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createLanguagesTable = `
  CREATE TABLE IF NOT EXISTS
  languages(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterLanguagesTable, createLanguagesTable };

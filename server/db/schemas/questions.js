const alterQuestionsTable = `
  ALTER TABLE questions
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN priority INT,
  ADD COLUMN question_key TEXT,
  ADD COLUMN question_text TEXT,
  ADD COLUMN subtext TEXT
`;

const createQuestionsTable = `
  CREATE TABLE IF NOT EXISTS questions(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterQuestionsTable, createQuestionsTable };

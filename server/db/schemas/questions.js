const alterQuestionsTable = `
  ALTER TABLE questions
  ADD COLUMN category VARCHAR(32),
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN priority INT,
  ADD COLUMN question_key VARCHAR(32),
  ADD COLUMN question_text TEXT,
  ADD COLUMN required BOOLEAN DEFAULT false,
  ADD COLUMN response_limit INT,
  ADD COLUMN subtext TEXT
`;

const createQuestionsTable = `
  CREATE TABLE IF NOT EXISTS questions(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterQuestionsTable, createQuestionsTable };

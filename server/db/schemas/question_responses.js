const alterQuestionResponseTable = `
  ALTER TABLE question_responses
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN priority INT,
  ADD COLUMN question_id UUID REFERENCES questions(id),
  ADD COLUMN response_key VARCHAR(32),
  ADD COLUMN value TEXT
`;

const createQuestionResponseTable = `
  CREATE TABLE IF NOT EXISTS question_responses(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterQuestionResponseTable, createQuestionResponseTable };

const alterUserQuestionResponseTable = `
  ALTER TABLE user_question_responses
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN question_id UUID REFERENCES questions(id),
  ADD COLUMN response_id UUID REFERENCES question_responses(id),
  ADD COLUMN user_id UUID REFERENCES users(id),
  ADD COLUMN value VARCHAR(40)
`;

const createUserQuestionResponseTable = `
  CREATE TABLE IF NOT EXISTS user_question_responses(
    id UUID PRIMARY KEY
  )
`;

module.exports = {
  alterUserQuestionResponseTable,
  createUserQuestionResponseTable,
};

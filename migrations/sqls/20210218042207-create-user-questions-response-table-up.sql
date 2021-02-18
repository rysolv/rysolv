CREATE TABLE IF NOT EXISTS user_question_responses (
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  question_id UUID REFERENCES questions(id),
  response_id UUID REFERENCES question_responses(id),
  user_id UUID REFERENCES users(id)
)

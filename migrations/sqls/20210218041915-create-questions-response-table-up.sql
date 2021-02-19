CREATE TABLE IF NOT EXISTS question_responses (
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  priority INT,
  question_id UUID REFERENCES questions(id),
  response_key VARCHAR(32),
  value TEXT
)

CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY,
  category VARCHAR(32),
  created_date TIMESTAMP,
  priority INT,
  question_key VARCHAR(32),
  question_text TEXT,
  response_limit INT,
  subtext TEXT
)


CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY,
  body TEXT,
  created_date TIMESTAMP,
  email VARCHAR(128),
  subject TEXT,
  user_id UUID REFERENCES users(id) NOT NULL
)

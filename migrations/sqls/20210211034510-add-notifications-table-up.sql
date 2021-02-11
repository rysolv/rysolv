CREATE TABLE IF NOT EXISTS notifications(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  user_id UUID REFERENCES users(id) NOT NULL,
  subject TEXT,
  body TEXT,
  email VARCHAR(128),
  method VARCHAR(16)
)

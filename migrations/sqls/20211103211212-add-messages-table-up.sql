CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  body TEXT NOT NULL,
  created_date TIMESTAMP,
  from_user_id UUID REFERENCES users(id),
  position_id UUID REFERENCES company_positions(id),
  read_date TIMESTAMP DEFAULT NULL,
  thread_id UUID,
  to_user_id UUID REFERENCES users(id)
);

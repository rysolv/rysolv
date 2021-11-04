CREATE TABLE IF NOT EXISTS hiring_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_type VARCHAR(128) NOT NULL,
  created_date TIMESTAMP,
  position_id UUID REFERENCES company_positions(id),
  user_id UUID REFERENCES users(id)
);

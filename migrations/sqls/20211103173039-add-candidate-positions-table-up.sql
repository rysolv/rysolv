CREATE TABLE IF NOT EXISTS candidate_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  percent_match FLOAT,
  position_id UUID REFERENCES company_positions(id),
  user_id UUID REFERENCES users(id)
);


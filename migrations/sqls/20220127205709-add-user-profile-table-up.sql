CREATE TABLE IF NOT EXISTS user_profiles (
  chart_data JSON,
  created_date TIMESTAMP DEFAULT now(),
  modified_date TIMESTAMP DEFAULT now(),
  user_id UUID REFERENCES users(id) UNIQUE
);

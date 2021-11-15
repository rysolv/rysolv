CREATE TABLE IF NOT EXISTS legal_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  body TEXT NOT NULL,
  created_date TIMESTAMP,
  title VARCHAR(64) NOT NULL,
  version INT NOT NULL
);

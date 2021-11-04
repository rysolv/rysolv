CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(64) NOT NULL,
  company_url VARCHAR(128),
  contract_accepted_date TIMESTAMP DEFAULT NULL,
  created_date TIMESTAMP,
  description TEXT,
  location VARCHAR(128),
  size INT
);

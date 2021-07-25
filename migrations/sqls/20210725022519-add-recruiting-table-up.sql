CREATE TABLE IF NOT EXISTS recruiting_signup (
  id UUID PRIMARY KEY,
  company_name VARCHAR(128),
  company_url VARCHAR(128),
  contact_email VARCHAR(128),
  contact_name VARCHAR(64),
  created_date TIMESTAMP
)

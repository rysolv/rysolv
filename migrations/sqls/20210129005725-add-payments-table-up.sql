  CREATE TABLE IF NOT EXISTS payments(
    id UUID PRIMARY KEY,
    action VARCHAR(32),
    created_date TIMESTAMP,
    fee FLOAT DEFAULT 0,
    funded_amount FLOAT,
    issue_id UUID REFERENCES issues(id),
    organization_id UUID REFERENCES organizations(id),
    platform VARCHAR(16),
    user_id UUID REFERENCES users(id)
  )

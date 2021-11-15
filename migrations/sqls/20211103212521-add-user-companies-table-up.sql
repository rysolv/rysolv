CREATE TABLE IF NOT EXISTS user_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  user_id UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS company_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id)
);

-- Create signed_contracts table
CREATE TABLE IF NOT EXISTS signed_contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  contract_id UUID REFERENCES legal_contracts(id),
  created_date TIMESTAMP
);

-- Also remove contract_accepted_date from company table
ALTER TABLE companies DROP COLUMN contract_accepted_date;

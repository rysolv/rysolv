const alterPaymentTable = `
  ALTER TABLE payments
  ADD COLUMN action VARCHAR(32),
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN fee FLOAT DEFAULT 0,
  ADD COLUMN funded_amount FLOAT,
  ADD COLUMN issue_id UUID REFERENCES issues(id),
  ADD COLUMN platform VARCHAR(16),
  ADD COLUMN repo_id UUID REFERENCES repos(id),
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createPaymentsTable = `
  CREATE TABLE IF NOT EXISTS payments(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterPaymentTable, createPaymentsTable };

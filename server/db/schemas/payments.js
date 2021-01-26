const alterPaymentTable = `ALTER TABLE payments
ADD COLUMN created_date TIMESTAMP,
ADD COLUMN fee FLOAT,
ADD COLUMN funded_amount FLOAT,
ADD COLUMN issue_id UUID REFERENCES issues(id),
ADD COLUMN organization_id UUID REFERENCES organizations(id),
ADD COLUMN platform VARCHAR(16),
ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createPaymentsTable = `CREATE TABLE IF NOT EXISTS
payments(
  id UUID PRIMARY KEY
)`;

module.exports = { alterPaymentTable, createPaymentsTable };

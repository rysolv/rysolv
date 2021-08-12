const alterWithdrawalTable = `
  ALTER TABLE withdrawal
  ADD COLUMN created_date TIMESTAMP,
  ADD COLUMN email VARCHAR(128),
  ADD COLUMN fee FLOAT,
  ADD COLUMN transfer_value FLOAT,
  ADD COLUMN user_id UUID REFERENCES users(id),
  ADD COLUMN withdrawal_date TIMESTAMP
`;

const createWithdrawalTable = `
  CREATE TABLE IF NOT EXISTS
  withdrawal(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterWithdrawalTable, createWithdrawalTable };

const withdrawal = `CREATE TABLE IF NOT EXISTS
  withdrawal(
    id UUID PRIMARY KEY,
    created_date TIMESTAMP,
    fee FLOAT,
    transfer_value FLOAT,
    user_id UUID REFERENCES users(id)
  )`;

module.exports = withdrawal;

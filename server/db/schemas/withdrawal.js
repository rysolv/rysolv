const withdrawal = `CREATE TABLE IF NOT EXISTS
  withdrawal(
    id UUID PRIMARY KEY,
    fee FLOAT,
    transfer_value FLOAT,
    user_id UUID REFERENCES users(id)
  )`;

module.exports = withdrawal;

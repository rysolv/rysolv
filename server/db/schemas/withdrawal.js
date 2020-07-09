const withdrawal = `CREATE TABLE IF NOT EXISTS
  withdrawal(
    fee FLOAT,
    transfer_value FLOAT,
    user_id UUID REFERENCES users(id)
  )`;

module.exports = withdrawal;

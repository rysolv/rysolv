const funding = `CREATE TABLE IF NOT EXISTS
funding(
  funded_amount FLOAT,
  id UUID PRIMARY KEY,
  is_approved BOOLEAN DEFAULT false,
  issue_id UUID,
  pullrequest_id UUID,
  user_id UUID REFERENCES users(id)
)`;

module.exports = funding;

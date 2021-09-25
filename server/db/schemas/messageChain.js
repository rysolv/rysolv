const alterMessageChainTable = `
  ALTER TABLE message_chain
  ADD COLUMN message_id UUID REFERENCES message(id),
  ADD COLUMN position_id UUID REFERENCES company_positions(id),
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createMessageChainTable = `
  CREATE TABLE IF NOT EXISTS
  message_chain(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterMessageChainTable, createMessageChainTable };

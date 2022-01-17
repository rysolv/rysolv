const alterPositionTechStackTable = `
  ALTER TABLE position_tech_stack
  ADD COLUMN level INT,
  ADD COLUMN position_id UUID REFERENCES company_positions(id),
  ADD COLUMN technology_id UUID REFERENCES technologies(id),
  ADD COLUMN user_id UUID REFERENCES users(id)
`;

const createPositionTechStackTable = `
  CREATE TABLE IF NOT EXISTS
  position_tech_stack(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  )
`;

module.exports = { alterPositionTechStackTable, createPositionTechStackTable };

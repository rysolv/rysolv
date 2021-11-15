CREATE TABLE IF NOT EXISTS position_tech_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level INT,
  position_id UUID REFERENCES company_positions(id),
  technology_id UUID REFERENCES technologies(id)
);

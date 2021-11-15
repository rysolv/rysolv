CREATE TABLE IF NOT EXISTS technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  is_framework BOOLEAN DEFAULT false,
  is_language BOOLEAN DEFAULT false,
  name VARCHAR(32),
  short_name VARCHAR(32)
);

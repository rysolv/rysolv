CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) UNIQUE,
  country VARCHAR(32),
  country_code VARCHAR(5),
  formatted_address VARCHAR(64),
  position_id UUID REFERENCES company_positions(id) UNIQUE,
  user_id UUID REFERENCES users(id) UNIQUE,
  utc_offset_minutes SMALLINT
);

-- Remove location from companies table (replaced with locations table)
ALTER TABLE companies DROP COLUMN location;

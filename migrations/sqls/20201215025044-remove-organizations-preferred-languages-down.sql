ALTER TABLE organizations ADD COLUMN IF NOT EXISTS preferred_languages VARCHAR(128) [] DEFAULT '{}'

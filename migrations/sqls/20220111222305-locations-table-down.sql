DROP TABLE IF EXISTS locations CASCADE;

ALTER TABLE companies ADD COLUMN location VARCHAR(128);

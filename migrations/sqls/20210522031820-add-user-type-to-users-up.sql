ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type VARCHAR(7) DEFAULT 'full';

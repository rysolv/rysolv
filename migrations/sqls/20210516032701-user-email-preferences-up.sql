ALTER TABLE users ADD COLUMN IF NOT EXISTS receive_weekly_emails BOOLEAN DEFAULT true;

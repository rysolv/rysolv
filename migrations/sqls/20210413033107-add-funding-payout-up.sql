ALTER TABLE funding
ADD COLUMN IF NOT EXISTS repo_payout FLOAT DEFAULT 0,
ADD COLUMN IF NOT EXISTS user_payout FLOAT DEFAULT 0

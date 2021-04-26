ALTER TABLE funding ADD COLUMN IF NOT EXISTS user_accepted BOOLEAN DEFAULT false;

-- Default true for any bounties that have already been paid
UPDATE funding SET user_accepted = true WHERE is_approved = true;

ALTER TABLE repos
DROP COLUMN IF EXISTS paid_to_repo,
DROP COLUMN IF EXISTS user_accepted_date,
DROP COLUMN IF EXISTS paid_to_repo_date

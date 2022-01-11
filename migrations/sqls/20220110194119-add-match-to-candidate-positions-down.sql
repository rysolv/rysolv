ALTER TABLE candidate_positions
DROP COLUMN IF EXISTS match_criteria,
DROP COLUMN IF EXISTS created_date;

DROP INDEX IF EXISTS user_position_index;

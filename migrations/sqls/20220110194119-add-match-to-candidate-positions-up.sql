ALTER TABLE candidate_positions
ADD COLUMN match_criteria JSONB,
ADD COLUMN created_date TIMESTAMP DEFAULT now();

CREATE UNIQUE INDEX user_position_index ON candidate_positions(position_id, user_id);

-- Add unique index on position/user & technology.
-- Allows for ON CONFLICT UPDATE
CREATE UNIQUE INDEX position_tech_index on position_tech_stack (position_id, technology_id);
CREATE UNIQUE INDEX user_tech_index on position_tech_stack (user_id, technology_id);

ALTER TABLE position_tech_stack
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id)

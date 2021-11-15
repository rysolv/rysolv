ALTER TABLE user_question_responses
ADD COLUMN position_id UUID REFERENCES company_positions(id)

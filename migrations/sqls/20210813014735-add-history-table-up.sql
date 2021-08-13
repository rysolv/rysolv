CREATE TABLE IF NOT EXISTS analytics_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commits INT,
    created_date TIMESTAMP,
    errors JSON [],
    files INT,
    repos INT,
    time INT,
    user_id UUID REFERENCES users(id)
);

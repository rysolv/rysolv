CREATE TABLE IF NOT EXISTS user_emails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(256),
    primary_email BOOLEAN,
    user_id UUID REFERENCES users(id)
);

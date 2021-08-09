CREATE TABLE IF NOT EXISTS user_emails (
    id UUID PRIMARY KEY,
    email VARCHAR(256),
    primary_email BOOLEAN,
    user_id UUID REFERENCES users(id)
);

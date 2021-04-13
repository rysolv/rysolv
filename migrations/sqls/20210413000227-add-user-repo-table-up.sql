CREATE TABLE IF NOT EXISTS user_repos(
    id UUID PRIMARY KEY,
    github_id INT,
    repo_id UUID REFERENCES repos(id),
    user_id UUID REFERENCES users(id),
    user_type VARCHAR(32)
  )

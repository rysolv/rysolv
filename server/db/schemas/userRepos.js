const alterUserReposTable = `
  ALTER TABLE user_repos
  ADD COLUMN github_id INT,
  ADD COLUMN repo_id UUID REFERENCES organizations(id),
  ADD COLUMN user_id UUID REFERENCES users(id),
  ADD COLUMN user_type
`;

const createUserReposTable = `
  CREATE TABLE IF NOT EXISTS user_repos(
    id UUID PRIMARY KEY
  )
`;

module.exports = { alterUserReposTable, createUserReposTable };

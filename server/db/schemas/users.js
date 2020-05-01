const users = `CREATE TABLE IF NOT EXISTS
users(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  email VARCHAR(128) NOT NULL,
  watching UUID [],
  rep SMALLINT NOT NULL DEFAULT 0,
  profile_pic VARCHAR(255),
  comments UUID [],
  attempting UUID [],
  issues_number UUID [],
  username VARCHAR(40),
  github_link VARCHAR(128),
  personal_link VARCHAR(128),
  preferred_languages VARCHAR(128) [],
  stackoverflow_link VARCHAR(128),
  activePullRequests VARCHAR(128) [],
  completedPullRequests VARCHAR(128) [],
  rejectedPullRequests VARCHAR(128) [],
  dollarsEarned FLOAT DEFAULT 0,
  pull_requests UUID [],
  upvotes UUID []
)`;

module.exports = users;

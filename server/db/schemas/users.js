const users = `CREATE TABLE IF NOT EXISTS
users(
  active_pull_requests SMALLINT DEFAULT 0,
  attempting UUID [],
  balance FLOAT DEFAULT 0,
  comments UUID [],
  completed_pull_requests SMALLINT DEFAULT 0,
  created_date TIMESTAMP,
  dollars_earned FLOAT DEFAULT 0,
  email VARCHAR(128) NOT NULL,
  first_name VARCHAR(128),
  github_link VARCHAR(128),
  id UUID PRIMARY KEY,
  is_deleted BOOLEAN DEFAULT false,
  is_online BOOLEAN DEFAULT true,
  issues UUID [],
  last_name VARCHAR(128),
  modified_date TIMESTAMP,
  organizations UUID [],
  personal_link VARCHAR(128),
  preferred_languages VARCHAR(128) [],
  profile_pic VARCHAR(255),
  pull_requests UUID [],
  rejected_pull_requests SMALLINT DEFAULT 0,
  rep SMALLINT NOT NULL DEFAULT 0,
  stackoverflow_link VARCHAR(128),
  upvotes UUID [],
  username VARCHAR(40),
  watching UUID []
)`;

module.exports = users;

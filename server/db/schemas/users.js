const users = `CREATE TABLE IF NOT EXISTS
users(
  active_pull_requests SMALLINT DEFAULT 0,
  attempting UUID [] DEFAULT '{}',
  balance FLOAT DEFAULT 100,
  comments UUID [] DEFAULT '{}',
  completed_pull_requests SMALLINT DEFAULT 0,
  created_date TIMESTAMP,
  dollars_earned FLOAT DEFAULT 0,
  email VARCHAR(128) NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  first_name VARCHAR(128),
  github_link VARCHAR(128),
  id UUID PRIMARY KEY,
  is_deleted BOOLEAN DEFAULT false,
  is_online BOOLEAN DEFAULT false,
  issues UUID [] DEFAULT '{}',
  last_name VARCHAR(128),
  modified_date TIMESTAMP,
  organizations UUID [] DEFAULT '{}',
  personal_link VARCHAR(128),
  preferred_languages VARCHAR(128) [] DEFAULT '{}',
  profile_pic VARCHAR(256),
  pull_requests UUID [] DEFAULT '{}',
  rejected_pull_requests SMALLINT DEFAULT 0,
  rep SMALLINT NOT NULL DEFAULT 25,
  stackoverflow_link VARCHAR(128),
  upvotes UUID [] DEFAULT '{}',
  username VARCHAR(40)
)`;

module.exports = users;

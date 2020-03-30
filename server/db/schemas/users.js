const users = `CREATE TABLE IF NOT EXISTS
users(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  email VARCHAR(128) NOT NULL,
  watching_list UUID [],
  rep SMALLINT NOT NULL DEFAULT 0,
  profile_pic VARCHAR(128),
  active_number SMALLINT NOT NULL DEFAULT 0,
  issues_number SMALLINT NOT NULL DEFAULT 0,
  username VARCHAR(40),
  github_link VARCHAR(128),
  personal_link VARCHAR(128),
  preferred_languages VARCHAR(128),
  stackoverflow_link VARCHAR(128)
)`;

module.exports = users;

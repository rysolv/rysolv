const users = `CREATE TABLE IF NOT EXISTS
users(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  first_name VARCHAR(128) NOT NULL,
  last_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  watching_list UUID [],
  rep SMALLINT NOT NULL DEFAULT 0,
  profile_pic VARCHAR(128),
  active_number SMALLINT NOT NULL DEFAULT 0,
  issues_number SMALLINT NOT NULL DEFAULT 0,
  username VARCHAR(40)
)`;

module.exports = users;

const comments = `CREATE TABLE IF NOT EXISTS
comments(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  target VARCHAR(128) NOT NULL,
  body VARCHAR(128) NOT NULL,
  "user" VARCHAR(128) NOT NULL
)`;

module.exports = comments;

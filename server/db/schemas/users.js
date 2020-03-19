const users = `CREATE TABLE IF NOT EXISTS
users(
  id UUID PRIMARY KEY,
  createdDate TIMESTAMP,
  modifiedDate TIMESTAMP,
  firstName VARCHAR(128) NOT NULL,
  lastName VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  lastOnline TIMESTAMP,
  watchingNumber SMALLINT,
  watchingList TEXT []
)`;

module.exports = users;

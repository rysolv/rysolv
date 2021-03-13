const alterUsersTable = `ALTER TABLE users
ADD COLUMN attempting UUID [] DEFAULT '{}',
ADD COLUMN balance FLOAT DEFAULT 0,
ADD COLUMN comments UUID [] DEFAULT '{}',
ADD COLUMN created_date TIMESTAMP,
ADD COLUMN dollars_earned FLOAT DEFAULT 0,
ADD COLUMN email VARCHAR(128) NOT NULL,
ADD COLUMN email_verified BOOLEAN DEFAULT false,
ADD COLUMN first_name VARCHAR(128),
ADD COLUMN github_id INT DEFAULT NULL,
ADD COLUMN github_link VARCHAR(128),
ADD COLUMN github_username VARCHAR(39) DEFAULT NULL,
ADD COLUMN is_deleted BOOLEAN DEFAULT false,
ADD COLUMN issues UUID [] DEFAULT '{}',
ADD COLUMN last_name VARCHAR(128),
ADD COLUMN modified_date TIMESTAMP,
ADD COLUMN personal_link VARCHAR(128),
ADD COLUMN profile_pic VARCHAR(256),
ADD COLUMN provider VARCHAR(7),
ADD COLUMN pull_requests UUID [] DEFAULT '{}',
ADD COLUMN rep SMALLINT NOT NULL DEFAULT 25,
ADD COLUMN stackoverflow_link VARCHAR(128),
ADD COLUMN upvotes UUID [] DEFAULT '{}',
ADD COLUMN username VARCHAR(40),
ADD CONSTRAINT chkBalance CHECK (balance >= 0)`;

const createUsersTable = `CREATE TABLE IF NOT EXISTS
users(
  id UUID PRIMARY KEY
)`;

module.exports = { alterUsersTable, createUsersTable };

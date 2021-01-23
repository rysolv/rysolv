const alterPullRequestsTable = `ALTER TABLE pullrequests
ADD COLUMN created_date TIMESTAMP,
ADD COLUMN github_username VARCHAR(128),
ADD COLUMN html_url VARCHAR(128),
ADD COLUMN is_deleted BOOLEAN DEFAULT false,
ADD COLUMN issue_id UUID REFERENCES issues(id),
ADD COLUMN mergeable BOOLEAN,
ADD COLUMN mergeable_state VARCHAR(128),
ADD COLUMN merged BOOLEAN,
ADD COLUMN modified_date TIMESTAMP,
ADD COLUMN open BOOLEAN DEFAULT true,
ADD COLUMN pull_number SMALLINT,
ADD COLUMN title VARCHAR(512),
ADD COLUMN user_id UUID REFERENCES users(id)`;

const createPullRequestsTable = `CREATE TABLE IF NOT EXISTS
pullrequests(
  pullrequest_id UUID PRIMARY KEY
)`;

module.exports = { alterPullRequestsTable, createPullRequestsTable };

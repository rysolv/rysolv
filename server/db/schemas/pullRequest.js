const pullRequests = `CREATE TABLE IF NOT EXISTS
  pullrequests(
    api_url VARCHAR(128),
    created_date TIMESTAMP,
    github_username VARCHAR(128),
    html_url VARCHAR(128),
    issue_id UUID REFERENCES issues(id),
    mergeable BOOLEAN,
    mergeable_state VARCHAR(128),
    merged BOOLEAN,
    modified_date TIMESTAMP,
    open BOOLEAN DEFAULT true,
    pull_number SMALLINT,
    pullrequest_id UUID PRIMARY KEY,
    status VARCHAR(128),
    title VARCHAR(256),
    user_id UUID
  )`;

module.exports = pullRequests;

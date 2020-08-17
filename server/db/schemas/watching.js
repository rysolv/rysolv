const watching = `CREATE TABLE IF NOT EXISTS
watching(
  issue_id UUID REFERENCES issues(id),
  user_id UUID REFERENCES users(id),
  PRIMARY KEY (issue_id, user_id)
)`;

module.exports = watching;

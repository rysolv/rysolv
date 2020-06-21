const { mapValues, singleItem, singleQuery } = require('./query');
const { formatParamaters } = require('./helpers');

const pullRequestValues = [
  'api_url',
  'created_date',
  'github_username',
  'html_url',
  'issue_id',
  'mergeable',
  'mergeable_state',
  'merged',
  'modified_date',
  'open',
  'pull_number',
  'pullrequest_id',
  'status',
  'title',
  'user_id',
];

const pullRequestReturnValues = `
  issues.name AS "issueName",
  pullRequests.api_url AS "apiUrl",
  pullRequests.created_date AS "createdDate",
  pullRequests.github_username AS "githubUsername",
  pullRequests.html_url AS "htmlUrl",
  pullRequests.issue_id AS "issueId",
  pullRequests.mergeable AS "mergeable",
  pullRequests.mergeable_state AS "mergeableState",
  pullRequests.merged,
  pullRequests.modified_date AS "modifiedDate",
  pullRequests.open,
  pullRequests.pull_number AS "pullNumber",
  pullRequests.pullrequest_id AS "pullRequestId",
  pullRequests.status,
  pullRequests.title,
  pullRequests.user_id AS "userId"
`;

// Check duplicate organization
const checkDuplicatePullRequest = async repo => {
  const queryText = `
    SELECT pullrequest_id FROM pullrequests WHERE (html_url='${repo}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return true;
  }
  return false;
};

const createPullRequest = async data => {
  const { parameters, substitution, values } = formatParamaters(
    pullRequestValues,
    data,
  );
  const queryText = `INSERT INTO
    pullRequests(${parameters})
    VALUES(${substitution})
    returning *`;
  const result = await mapValues(queryText, values);
  return result;
};

const deletePullRequest = async id => {
  const rows = await singleItem('pullRequests', id);
  if (rows) {
    const queryText = `DELETE FROM pullRequests WHERE (id='${id}') RETURNING *`;
    await singleQuery(queryText);
    return `ID ${id} successfully deleted from Pull Requests`;
  }
  throw new Error(
    `Failed to delete pull request. ID not found in Pull Requests`,
  );
};

const getOnePullRequest = async id => {
  const queryText = `SELECT ${pullRequestReturnValues} FROM pullRequests
    LEFT JOIN issues ON (pullRequests.issue_id = issues.id)
    WHERE (pullRequests.pullrequest_id='${id}')`;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error('ID not found in Pull Requests');
};

const getPullRequests = async () => {
  const queryText = `SELECT ${pullRequestReturnValues} FROM pullRequests
    LEFT JOIN issues ON (pullRequests.issue_id = issues.id)`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

const getUserPullRequests = async id => {
  const queryText = `SELECT ${pullRequestReturnValues} FROM pullRequests
    LEFT JOIN issues ON (pullRequests.issue_id = issues.id)
    WHERE (pullRequests.user_id='${id}')`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = {
  checkDuplicatePullRequest,
  createPullRequest,
  deletePullRequest,
  getOnePullRequest,
  getPullRequests,
  getUserPullRequests,
};

const { mapValues, singleQuery } = require('../db/query');

const commentReturnValues = `
  action,
  activity_id AS "activityId",
  created_date AS "createdDate",
  issue_id AS "issueId",
  organization_id AS "organizationId",
  pullrequest_id AS "pullRequestId",
  user_id AS "userId",
  value
`;

// Create new Comments from seed
const createActivity = async data => {
  const queryText = `INSERT INTO
    comments(action, activity_id, created_date, issue_id, organization_id, user_id, value)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// GET all issues
const getActivity = async (table, column, id) => {
  const queryText = `SELECT ${commentReturnValues} FROM ${table}
    JOIN issues on (activity.issue_id = issues.id)
    JOIN organizations on (activity.organization_id = organizations.id)
    JOIN users on (activity.user_id = users.id)
    WHERE ${column} ='${id}'`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET all issues
const getIssueComments = async (table, id) => {
  const queryText = `SELECT ${commentReturnValues} FROM ${table} JOIN users ON (comments.user_id = users.id) WHERE comments.target='${id}'`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = { createActivity, getActivity, getIssueComments };

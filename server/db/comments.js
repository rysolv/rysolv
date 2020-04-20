const { mapValues, singleQuery } = require('../db/query');

const commentReturnValues = `
  comments.id AS "commentId",
  comments.created_date AS "createdDate",
  comments.modified_date AS "modifiedDate",
  comments.target,
  comments.body,
  users.id AS "userId",
  users.username,
  users.profile_pic AS "profilePic"
`;

// Create new Comments from seed
const createComment = async data => {
  const queryText = `INSERT INTO
    comments(id, created_date, modified_date, target, body, user_id)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// GET all issues
const getComments = async table => {
  const queryText = `SELECT ${commentReturnValues} FROM ${table} JOIN users ON (comments.user_id = users.id)`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET all issues
const getIssueComments = async (table, id) => {
  const queryText = `SELECT ${commentReturnValues} FROM ${table} JOIN users ON (comments.user_id = users.id) WHERE comments.target='${id}'`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = { createComment, getComments, getIssueComments };

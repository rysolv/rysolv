const { commentReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all comments on an issue
const getIssueComments = async (table, id) => {
  const queryText = `SELECT ${commentReturnValues} FROM ${table} JOIN users ON (comments.user_id = users.id) WHERE comments.target='${id}'`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = getIssueComments;

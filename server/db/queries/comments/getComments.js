const { commentReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all issues
const getComments = async table => {
  const queryText = `SELECT ${commentReturnValues} FROM ${table} JOIN users ON (comments.user_id = users.id)`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = getComments;

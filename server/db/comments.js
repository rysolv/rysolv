const pool = require('../db/connect');
const { mapValues } = require('../db/query');

// Create new Comments from seed
const createComment = async data => {
  const queryText = `INSERT INTO
    comments(id, created_date, modified_date, target, body, "user")
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  await mapValues(pool, queryText, data);
};

module.exports = { createComment };

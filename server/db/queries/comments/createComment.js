const { mapValues } = require('../../baseQueries');

// Create new Comments from seed
const createComment = async data => {
  const queryText = `INSERT INTO
    comments(id, created_date, modified_date, target, body, user_id)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

module.exports = createComment;

const pool = require('../db/connect');
const { mapValues } = require('../db/query');

// Create new User
const createUser = async data => {
  const queryText = `INSERT INTO
    users(id, created_date, modified_date, first_name, last_name, email, last_online, watching_number, watching_list)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`;
  await mapValues(pool, queryText, data);
};

module.exports = { createUser };

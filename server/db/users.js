const pool = require('../db/connect');
const { mapValues } = require('../db/query');

// Create new User
const createUser = async data => {
  const queryText = `INSERT INTO
    users(id, createdDate, modifiedDate, firstName, lastName, email, lastOnline, watchingNumber, watchingList)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`;
  await mapValues(pool, queryText, data);
};

module.exports = { createUser };

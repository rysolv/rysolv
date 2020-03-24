const { mapValues, singleItem, singleQuery } = require('../db/query');

// GET all users
const getUsers = async table => {
  const queryText = `SELECT * FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single user
const getOneUser = async (table, id) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// Create new User
const createUser = async data => {
  const queryText = `INSERT INTO
    users(id, created_date, modified_date, first_name, last_name, email, watching_list, rep)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// PATCH single user
const transformUser = async (table, id, data) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    const queryText = `UPDATE ${table}
      SET (modified_date, first_name, last_name, email, watching_list, rep)
      = ($1, $2, $3, $4, $5, $6)
      WHERE (id = '${id}')
      RETURNING *`;
    const result = await mapValues(queryText, data);
    return result;
  }
  throw new Error(`Failed to update users. ID not found in ${table}`);
};

// DELETE single issue
const deleteUser = async (table, id) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
    await singleQuery(queryText);
    return `ID ${id} successfully deleted from table ${table}`;
  }
  throw new Error(`Failed to delete user. ID not found in ${table}`);
};

module.exports = {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  transformUser,
};

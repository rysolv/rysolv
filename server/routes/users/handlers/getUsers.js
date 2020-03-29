// import moment from 'moment';
// import { v4 as uuidv4 } from 'uuid';
const db = require('../../../db');
const { users } = require('../../../mockData/users');

const execute = async () => {
  const findAllQuery = 'SELECT * FROM users';
  try {
    const { rows, rowCount } = await db.query(findAllQuery);
    console.log(rowCount);
    console.table(rows);
  } catch (error) {
    console.log(error);
  }
};

async function getUsers(req, res, next) {
  execute();

  try {
    req.data = req.data || {};
    req.data.users = users;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getUsers;

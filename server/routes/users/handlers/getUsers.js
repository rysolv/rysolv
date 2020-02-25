const { users } = require('../../../mockData/users');

async function getUsers(req, res, next) {
  try {
    req.data = req.data || {};
    req.data.users = users;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getUsers;

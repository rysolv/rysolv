const { users } = require('../../../mockData/users');

async function searchUsers(req, res, next) {
  try {
    const {
      query: { user },
    } = req;
    req.data = req.data || {};
    const userList = users.filter(obj =>
      obj.name
        .toLowerCase()
        .replace(/ /g, '')
        .includes(user.toLowerCase().replace(/ /g, '')),
    );
    req.data.users = userList;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = searchUsers;

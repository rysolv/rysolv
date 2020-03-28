const { users } = require('../../../mockData/users');

async function getUser(req, res, next) {
  try {
    const {
      params: { userId },
    } = req;
    req.data = req.data || {};
    const user = users.find(obj => obj.id === userId);
    req.data.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getUser;

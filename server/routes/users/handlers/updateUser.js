const { updateMessage } = require('../../../mockData/users');

async function updateUser(req, res, next) {
  try {
    req.data = req.data || {};
    req.data.message = updateMessage;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = updateUser;

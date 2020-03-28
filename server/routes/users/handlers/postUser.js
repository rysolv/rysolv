const { postMessage } = require('../../../mockData/users');

async function postUser(req, res, next) {
  try {
    req.data = req.data || {};
    req.data.message = postMessage;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = postUser;

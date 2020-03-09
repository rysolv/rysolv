const { updateMessage } = require('../../../mockData/companies');

async function updateCompany(req, res, next) {
  try {
    req.data = req.data || {};
    req.data.message = updateMessage;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = updateCompany;

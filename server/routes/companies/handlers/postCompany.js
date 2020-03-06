const { postMessage } = require('../../../mockData/companies');

async function postCompany(req, res, next) {
  try {
    req.data = req.data || {};
    req.data.message = postMessage;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = postCompany;

const { companies } = require('../../../mockData/companies');

async function getCompanies(req, res, next) {
  try {
    req.data = req.data || {};
    req.data.companies = companies;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getCompanies;

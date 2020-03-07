const { companies } = require('../../../mockData/companies');

async function getCompanyInfo(req, res, next) {
  try {
    const {
      params: { companyId },
    } = req;
    req.data = req.data || {};
    const company = companies.find(obj => obj.id === companyId);
    req.data.company = company;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getCompanyInfo;

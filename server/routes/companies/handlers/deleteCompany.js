const { companies, deleteMessage } = require('../../../mockData/companies');

async function deleteCompany(req, res, next) {
  try {
    const {
      params: { companyId },
    } = req;
    req.data = req.data || {};
    const company = companies.find(obj => obj.id === companyId);
    req.data.message = company.name.concat(deleteMessage);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteCompany;

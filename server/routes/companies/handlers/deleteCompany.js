const { companies, deleteMessage } = require('../../../mockData/companies');

async function deleteCompany(req, res, next) {
  try {
    const {
      params: { companyId },
    } = req;
    req.data = req.data || {};
    const { name } = companies.find(obj => obj.id === companyId);
    req.data.message = name.concat(deleteMessage);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteCompany;

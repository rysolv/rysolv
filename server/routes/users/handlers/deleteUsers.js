const { users, deleteMessage } = require('../../../mockData/users');

async function deleteCompany(req, res, next) {
  try {
    const {
      params: { companyId },
    } = req;
    req.data = req.data || {};
    const company = users.find(obj => obj.id === companyId);
    req.data.message = company.name.concat(deleteMessage);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteCompany;

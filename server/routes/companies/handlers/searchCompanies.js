const capitalize = require('lodash/capitalize');

const { companies } = require('../../../mockData/companies');

async function searchCompanies(req, res, next) {
  try {
    const {
      query: { company },
    } = req;
    req.data = req.data || {};
    const companyList = companies.filter(
      obj => obj.name === capitalize(company),
    );
    req.data.companies = companyList;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = searchCompanies;

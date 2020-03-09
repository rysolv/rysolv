const express = require('express');

const router = express.Router();

const {
  deleteCompany,
  getCompanies,
  getCompanyInfo,
  postCompany,
  searchCompanies,
  updateCompany,
} = require('./handlers');
const { responseData } = require('../helper');

router.delete('/:companyId', deleteCompany, responseData);

router.get('/search', searchCompanies, responseData);

router.get('/:companyId', getCompanyInfo, responseData);

router.get('/', getCompanies, responseData);

router.post('/:companyId', updateCompany, responseData);

router.post('/', postCompany, responseData);

module.exports = router;

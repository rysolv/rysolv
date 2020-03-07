const express = require('express');

const router = express.Router();

const {
  deleteCompany,
  getCompanies,
  getCompanyInfo,
  postCompany,
} = require('./handlers');
const { responseData } = require('../helper');

router.delete('/:companyId', deleteCompany, responseData);

router.get('/', getCompanies, responseData);

router.get('/:companyId', getCompanyInfo, responseData);

router.post('/', postCompany, responseData);

module.exports = router;

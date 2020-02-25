const express = require('express');

const router = express.Router();

const { deleteCompany, getCompanies } = require('./handlers');
const { responseData } = require('../helper');

router.delete('/:companyId', deleteCompany, responseData);

router.get('/', getCompanies, responseData);

module.exports = router;

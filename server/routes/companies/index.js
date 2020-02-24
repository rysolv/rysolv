const express = require('express');

const router = express.Router();

const { getCompanies } = require('./handlers');
const { responseData } = require('../helper');

router.get('/', getCompanies, responseData);

module.exports = router;

const express = require('express');

const router = express.Router();

const { getUsers } = require('./handlers');
const { responseData } = require('../helper');

router.get('/', getUsers, responseData);

module.exports = router;

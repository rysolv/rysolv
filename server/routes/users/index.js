const express = require('express');

const router = express.Router();

const { getUsers, searchUsers } = require('./handlers');
const { responseData } = require('../helper');

router.get('/', getUsers, responseData);

router.get('/search', searchUsers, responseData);

module.exports = router;

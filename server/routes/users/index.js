const express = require('express');

const router = express.Router();

const { getUsers, postUser, searchUsers } = require('./handlers');
const { responseData } = require('../helper');

router.get('/', getUsers, responseData);

router.get('/search', searchUsers, responseData);

router.post('/', postUser, responseData);

module.exports = router;

const express = require('express');

const router = express.Router();

const { deleteUser, getUsers, postUser, searchUsers } = require('./handlers');
const { responseData } = require('../helper');

router.delete('/:userId', deleteUser, responseData);

router.get('/', getUsers, responseData);

router.get('/search', searchUsers, responseData);

router.post('/', postUser, responseData);

module.exports = router;

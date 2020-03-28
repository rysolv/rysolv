const express = require('express');

const router = express.Router();

const {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  searchUsers,
  updateUser,
} = require('./handlers');
const { responseData } = require('../helper');

router.delete('/:userId', deleteUser, responseData);

router.get('/', getUsers, responseData);

router.get('/search', searchUsers, responseData);

router.get('/:userId', getUser, responseData);

router.post('/', postUser, responseData);

router.post('/:userId', updateUser, responseData);

module.exports = router;

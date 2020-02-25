const express = require('express');

const router = express.Router();

const companiesRouter = require('./companies');
const userRouter = require('./users');

router.use('/api/companies', companiesRouter);
router.use('/api/users', userRouter);

module.exports = router;

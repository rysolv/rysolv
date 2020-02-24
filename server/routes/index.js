const express = require('express');

const router = express.Router();

const companiesRouter = require('./companies');

router.use('/companies', companiesRouter);

module.exports = router;

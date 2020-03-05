const express = require('express');

const router = express.Router();

const { getIssues, getIssueDetail, deleteIssue } = require('./handlers');
const { responseData } = require('../helper');

router.get('/', getIssues, responseData);
router.get('/:issueID', getIssueDetail, responseData);

router.delete('/:issueID', deleteIssue, responseData);

module.exports = router;

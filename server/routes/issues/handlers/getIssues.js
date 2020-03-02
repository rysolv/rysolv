const { issues } = require('../../../mockData/issues');

async function getIssues(req, res, next) {
  try {
    req.data = req.data || {};
    req.data.issues = issues;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getIssues;

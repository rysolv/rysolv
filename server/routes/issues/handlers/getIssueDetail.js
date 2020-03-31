const { issues } = require('../../../mockData/issues');

async function getIssueDetail(req, res, next) {
  try {
    req.data = req.data || {};
    const issueDetail = issues[0];
    req.data.issueDetail = issueDetail;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getIssueDetail;

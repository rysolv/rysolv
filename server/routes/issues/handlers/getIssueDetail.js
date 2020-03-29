const { issues } = require('../../../mockData/issues');

async function getIssueDetail(req, res, next) {
  console.log('getting issueDetail');
  try {
    console.log(req.params);
    req.data = req.data || {};

    const issueDetail = issues[0];

    req.data.issueDetail = issueDetail;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getIssueDetail;

const { issues, deleteMessage } = require('../../../mockData/issues');

async function deleteIssue(req, res, next) {
  try {
    const {
      params: { issueId },
    } = req;
    req.data = req.data || {};
    const issue = issues.find(obj => obj.id === issueId);
    req.data.message = issue.name.concat(deleteMessage);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteIssue;

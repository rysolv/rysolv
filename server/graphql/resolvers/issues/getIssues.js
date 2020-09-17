const { getIssues: getIssuesQuery } = require('../../../db');

const getIssues = async () => {
  try {
    const issues = await getIssuesQuery();
    return issues;
  } catch (err) {
    throw err;
  }
};

module.exports = getIssues;

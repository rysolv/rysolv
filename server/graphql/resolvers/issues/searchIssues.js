const { errorLogger } = require('../../../helpers');
const { searchIssues: searchIssuesQuery } = require('../../../db');

const searchIssues = async ({ value }) => {
  try {
    const issues = await searchIssuesQuery({ value });
    return issues;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = searchIssues;

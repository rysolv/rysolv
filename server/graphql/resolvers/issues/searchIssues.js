const { searchIssues: searchIssuesQuery } = require('../../../db');

const searchIssues = async args => {
  const { value } = args;
  try {
    const result = await searchIssuesQuery({ value });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = searchIssues;

const { singleQuery } = require('../../baseQueries');

const getCompanyMatches = async ({ userId }) => {
  const queryText = ``;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getCompanyMatches;

const { singleQuery } = require('../../baseQueries');

const postUserResponse = async ({ category }) => {
  const queryText = `
    COMING SOON
  `;
  const { rows } = await singleQuery({ queryText, values: [category] });
  return rows;
};

module.exports = postUserResponse;

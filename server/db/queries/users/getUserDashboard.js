const { singleQuery } = require('../../baseQueries');

const getUserDashboard = async ({ userId }) => {
  const queryText = `

  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getUserDashboard;

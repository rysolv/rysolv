const { singleQuery } = require('../../baseQueries');

const deleteUserCompanies = async ({ userId }) => {
  const queryText = `
    DELETE FROM user_companies uc
    WHERE uc.user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = deleteUserCompanies;

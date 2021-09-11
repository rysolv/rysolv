const { singleQuery } = require('../../baseQueries');

const getCompanyMatches = async ({ companyId }) => {
  const queryText = `
    SELECT * FROM company_positions
    JOIN candidate_positions ON candidate_positions.position_id = company_positions.id 
    JOIN users ON candidate_positions.user_id = users.id
    WHERE company_positions.company_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [companyId] });
  return rows;
};

module.exports = getCompanyMatches;

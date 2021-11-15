const { singleQuery } = require('../../baseQueries');

const getOneCompany = async ({ companyId }) => {
  const queryText = `
    SELECT 
      company_name AS name,
      company_url AS website,
      description,
      location,
      logo,
      size
    FROM companies
    WHERE id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [companyId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneCompany;

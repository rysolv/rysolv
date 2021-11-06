const { singleQuery } = require('../../baseQueries');

// GET user company
const getUserCompany = async ({ userId }) => {
  const queryText = `
    SELECT
      c.company_name AS "name",
      c.company_url AS "website",
      c.contract_accepted_date AS "contractAcceptedDate",
      c.description,
      c.id,
      c.location,
      c.size
    FROM companies c
    JOIN user_companies uc ON c.id = uc.company_id
    WHERE uc.user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserCompany;

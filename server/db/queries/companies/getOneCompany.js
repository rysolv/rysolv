const { singleQuery } = require('../../baseQueries');

// @TODO: Location
// This doesn't need to be a left join
const getOneCompany = async ({ companyId }) => {
  const queryText = `
    SELECT
      c.company_name AS name,
      c.company_url AS website,
      c.customer_id AS "customerId",
      c.description,
      c.id,
      c.logo,
      c.payment_method AS "paymentMethod",
      c.payment_set_date AS "paymentSetDate",
      c.size,
      l.formatted_address AS location
    FROM companies c
    LEFT JOIN locations l ON l.company_id = c.id
    WHERE c.id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [companyId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneCompany;

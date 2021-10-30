const { singleQuery } = require('../../baseQueries');

const insertUserCompany = async ({ values }) => {
  const queryText = `
    INSERT INTO user_companies (company_id, id, user_id)
    VALUES($1, $2, $3)
  `;

  const { rows } = await singleQuery({ queryText, values });
  return rows;
};

module.exports = insertUserCompany;

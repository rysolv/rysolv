const { singleQuery } = require('../../baseQueries');

const postContractAccepted = async ({ companyId }) => {
  const values = [companyId, new Date()];
  const queryText = `
    UPDATE companies SET
    contract_accepted_date = $2
    WHERE id = $1
  `;
  await singleQuery({ queryText, values });
};

module.exports = postContractAccepted;

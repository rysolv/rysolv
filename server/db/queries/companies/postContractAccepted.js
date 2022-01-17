const { singleQuery } = require('../../baseQueries');

const postContractAccepted = async ({ companyId, plan }) => {
  const queryText = `
    INSERT INTO signed_contracts (
      company_id, created_date, contract_id
    ) VALUES (
      $1,
      $2,
      (
        SELECT lc.id FROM legal_contracts lc
        WHERE lc.contract_key = $3
        ORDER BY version ASC
      )
    )
  `;
  const values = [companyId, new Date(), plan];
  await singleQuery({ queryText, values });
};

module.exports = postContractAccepted;

const { singleQuery } = require('../../baseQueries');

const getContractByKey = async ({ key }) => {
  const queryText = `
    SELECT body, contract_key AS key, subtitle, title, version
    FROM legal_contracts
    WHERE contract_key = $1
    ORDER BY version DESC
    LIMIT 1
  `;
  const { rows } = await singleQuery({ queryText, values: [key] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getContractByKey;

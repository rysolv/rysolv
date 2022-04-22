const { singleQuery } = require('../../baseQueries');

const getCompanyContact = async ({ positionId }) => {
  const queryText = `
    SELECT uc.user_id AS "userId"
    FROM user_companies uc
    JOIN company_positions cp ON cp.company_id = uc.company_id
    WHERE cp.id = $1
    LIMIT 1
  `;
  const { rows } = await singleQuery({ queryText, values: [positionId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getCompanyContact;

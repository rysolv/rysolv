const { mapValues } = require('../../baseQueries');

// PATCH single user balance
const transformUserBalance = async ({ adjustedBalanceValue, userId }) => {
  const values = [[adjustedBalanceValue, userId]];

  const queryText = `
    UPDATE users
    SET balance = $1
    WHERE (id = $2)
    RETURNING balance`;

  const [result] = await mapValues(queryText, values);
  return result;
};

module.exports = transformUserBalance;

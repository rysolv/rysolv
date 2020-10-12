const { singleQuery } = require('../../baseQueries');

// Update user balance
const transformUserBalance = async ({ adjustedBalanceValue, userId }) => {
  const queryText = `
    UPDATE users
    SET balance = $1
    WHERE id = $2
    RETURNING balance
  `;
  const { rows } = await singleQuery({
    queryText,
    values: [adjustedBalanceValue, userId],
  });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = transformUserBalance;

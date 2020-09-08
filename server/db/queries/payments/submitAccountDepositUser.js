const { singleQuery } = require('../../baseQueries');

// UPDATE balance of user for deposit
const submitAccountDepositUser = async ({ amount, userId }) => {
  const queryText = `
    UPDATE users
    SET balance = balance + $1
    WHERE id = $2
    RETURNING *
  `;
  const { rows } = await singleQuery({ queryText, values: [amount, userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = submitAccountDepositUser;

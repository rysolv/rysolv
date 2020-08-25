const { singleQuery } = require('../../baseQueries');

// UPDATE balance of user for deposit
const submitAccountDepositUser = async ({ amount, userId }) => {
  const queryText = `UPDATE users SET balance=balance+${amount} WHERE (id = '${userId}') RETURNING *`;
  const { rows } = await singleQuery({ queryText });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = submitAccountDepositUser;

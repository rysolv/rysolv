const { singleQuery } = require('../../baseQueries');

// UPDATE balance of user for payment
const submitAccountPaymentUser = async ({ fundValue, userId }) => {
  const queryText = `UPDATE users SET balance=balance-${fundValue} WHERE (id = '${userId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  const [oneRow] = rows;
  return oneRow;
};

module.exports = submitAccountPaymentUser;

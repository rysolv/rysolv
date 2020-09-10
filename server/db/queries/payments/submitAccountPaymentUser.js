const { singleQuery } = require('../../baseQueries');

// UPDATE balance of user for payment
const submitAccountPaymentUser = async ({ fundValue, userId }) => {
  const queryText = `
    UPDATE users
    SET balance = balance - $1
    WHERE id = $2
    RETURNING *
  `;
  const { rows } = await singleQuery({
    queryText,
    values: [fundValue, userId],
  });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = submitAccountPaymentUser;

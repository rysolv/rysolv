const pool = require('../../connect');
const { singleQuery } = require('../../baseQueries');
const updatePaymentTable = require('./updatePaymentTable');

// UPDATE balance of user for deposit
const submitAccountDepositUser = async ({ amount, platform, userId }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const queryText = `
      UPDATE users
      SET balance = balance + $1
      WHERE id = $2
      RETURNING *
  `;
    const { rows } = await singleQuery({ queryText, values: [amount, userId] });
    const [oneRow] = rows;

    await updatePaymentTable({
      action: 'fund_account',
      fundedAmount: amount,
      platform,
      userId,
    });
    await client.query('COMMIT');

    return oneRow;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = submitAccountDepositUser;

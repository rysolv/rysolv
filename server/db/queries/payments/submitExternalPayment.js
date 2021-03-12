const pool = require('../../connect');
const { singleQuery } = require('../../baseQueries');
const updatePaymentTable = require('./updatePaymentTable');

const submitExternalPayment = async ({
  action,
  fundValue,
  issueId,
  platform,
  userId,
}) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const issueQueryText = `
      UPDATE issues
      SET funded_amount = funded_amount + $1
      WHERE id = $2
      RETURNING funded_amount AS "fundedAmount", repo_id AS "repoId"
    `;
    const { rows } = await singleQuery({
      queryText: issueQueryText,
      values: [fundValue, issueId],
    });
    const [oneRow] = rows;
    const { fundedAmount, repoId } = oneRow;

    await updatePaymentTable({
      action,
      fundedAmount: fundValue,
      issueId,
      platform,
      repoId,
      userId,
    });

    await client.query('COMMIT');
    return { fundedAmount, repoId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = submitExternalPayment;

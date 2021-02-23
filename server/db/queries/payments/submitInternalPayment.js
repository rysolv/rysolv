const pool = require('../../connect');
const { singleQuery } = require('../../baseQueries');
const updatePaymentTable = require('./updatePaymentTable');

const submitInternalPayment = async ({
  action,
  fundValue,
  issueId,
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
    const { rows: issueRows } = await singleQuery({
      queryText: issueQueryText,
      values: [fundValue, issueId],
    });
    const [oneIssueRow] = issueRows;
    const { fundedAmount, repoId } = oneIssueRow;

    const repoQueryText = `
      UPDATE repos
      SET total_funded = total_funded + $1
      WHERE id = $2
    `;
    await singleQuery({
      queryText: repoQueryText,
      values: [fundValue, repoId],
    });

    const userQueryText = `
      UPDATE users
      SET balance = balance - $1
      WHERE id = $2
      RETURNING balance
    `;
    const { rows: userRows } = await singleQuery({
      queryText: userQueryText,
      values: [fundValue, userId],
    });
    const [oneUserRow] = userRows;
    const { balance } = oneUserRow;

    await updatePaymentTable({
      action,
      fundedAmount: fundValue,
      issueId,
      platform: 'account',
      repoId,
      userId,
    });

    await client.query('COMMIT');
    return { balance, fundedAmount, repoId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = submitInternalPayment;

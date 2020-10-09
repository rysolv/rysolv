const pool = require('../../connect');
const { singleQuery } = require('../../baseQueries');

const submitInternalPayment = async ({ fundValue, issueId, userId }) => {
  // Pulling in Client to use transaction
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const issueQueryText = `
      UPDATE issues
      SET funded_amount = funded_amount + $1
      WHERE id = $2
      RETURNING funded_amount AS "fundedAmount", organization_id AS "organizationId"
    `;
    const { rows: issueRows } = await singleQuery({
      queryText: issueQueryText,
      values: [fundValue, issueId],
    });
    const [oneIssueRow] = issueRows;
    const { fundedAmount, organizationId } = oneIssueRow;

    const organizationQueryText = `
      UPDATE organizations
      SET total_funded = total_funded + $1
      WHERE id = $2
    `;
    await singleQuery({
      queryText: organizationQueryText,
      values: [fundValue, organizationId],
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

    // Commit transaction
    await client.query('COMMIT');
    return { balance, fundedAmount, organizationId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = submitInternalPayment;

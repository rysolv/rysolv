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
      RETURNING funded_amount AS "fundedAmount", organization_id AS "organizationId"
    `;
    const { rows } = await singleQuery({
      queryText: issueQueryText,
      values: [fundValue, issueId],
    });
    const [oneRow] = rows;
    const { fundedAmount, organizationId } = oneRow;

    const organizationQueryText = `
      UPDATE organizations
      SET total_funded = total_funded + $1
      WHERE id = $2
    `;
    await singleQuery({
      queryText: organizationQueryText,
      values: [fundValue, organizationId],
    });

    await updatePaymentTable({
      action,
      fundedAmount: fundValue,
      issueId,
      organizationId,
      platform,
      userId,
    });

    await client.query('COMMIT');
    return { fundedAmount, organizationId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = submitExternalPayment;

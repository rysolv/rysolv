const { v4: uuidv4 } = require('uuid');
const { singleQuery } = require('../../baseQueries');

const updatePaymentTable = async ({
  action,
  fundedAmount,
  issueId,
  organizationId,
  platform,
  userId,
}) => {
  const fee =
    platform === 'account' ? 0 : (fundedAmount * 0.03 + 0.3).toFixed(2);

  const updatePaymentsQuery = `
    INSERT INTO payments(
      action,
      created_date,
      fee,
      funded_amount,
      id,
      issue_id,
      organization_id,
      platform,
      user_id
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  const values = [
    action,
    new Date(),
    fee,
    fundedAmount,
    uuidv4(),
    issueId,
    organizationId,
    platform,
    userId,
  ];

  await singleQuery({
    queryText: updatePaymentsQuery,
    values,
  });
};

module.exports = updatePaymentTable;

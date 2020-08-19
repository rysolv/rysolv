const { singleQuery } = require('../db/query');

// UPDATE fund_value of issue for payment
const submitAccountPaymentIssue = async ({ fundValue, issueId }) => {
  const queryText = `UPDATE issues SET funded_amount=funded_amount+${fundValue} WHERE (id = '${issueId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  const [oneRow] = rows;
  return oneRow;
};

// UPDATE balance of organization for payment
const submitAccountPaymentOrganization = async ({
  fundValue,
  organizationId,
}) => {
  const queryText = `UPDATE organizations SET total_funded=total_funded+${fundValue} WHERE (id = '${organizationId}')`;
  await singleQuery(queryText);
};

// UPDATE balance of user for deposit
const submitAccountDepositUser = async ({ amount, userId }) => {
  const queryText = `UPDATE users SET balance=balance+${amount} WHERE (id = '${userId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  const [oneRow] = rows;
  return oneRow;
};

// UPDATE balance of user for payment
const submitAccountPaymentUser = async ({ fundValue, userId }) => {
  const queryText = `UPDATE users SET balance=balance-${fundValue} WHERE (id = '${userId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  const [oneRow] = rows;
  return oneRow;
};

module.exports = {
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
};

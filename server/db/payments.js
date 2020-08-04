const { singleQuery } = require('../db/query');
const { getOneIssue } = require('./issues');
const { getOneOrganization } = require('./organizations');
const { getOneUser } = require('./users');

// UPDATE fund_value of issue for payment
const submitAccountPaymentIssue = async (issueId, fundValue) => {
  const [issueData] = await getOneIssue(issueId);
  const { fundedAmount } = issueData;
  const adjustedFundValue = fundValue + fundedAmount;
  const queryText = `UPDATE issues SET funded_amount=${adjustedFundValue} WHERE (id = '${issueId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// UPDATE balance of organization for payment
const submitAccountPaymentOrganization = async (organizationId, fundValue) => {
  const [{ totalFunded }] = await getOneOrganization(organizationId);
  const adjustedFundedValue = totalFunded + fundValue;
  const queryText = `UPDATE organizations SET total_funded=${adjustedFundedValue} WHERE (id = '${organizationId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// UPDATE balance of user for deposit
const submitAccountDepositUser = async (userId, amount) => {
  const { balance } = await getOneUser(userId);
  const adjustedBalanceValue = amount + balance;
  const queryText = `UPDATE users SET balance=${adjustedBalanceValue} WHERE (id = '${userId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// UPDATE balance of user for payment
const submitAccountPaymentUser = async (userId, fundValue) => {
  const { balance } = await getOneUser(userId);
  const adjustedBalanceValue = balance - fundValue;
  const queryText = `UPDATE users SET balance=${adjustedBalanceValue} WHERE (id = '${userId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = {
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
};

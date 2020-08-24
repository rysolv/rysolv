const { singleQuery } = require('../../baseQueries');

// UPDATE fund_value of issue for payment
const submitAccountPaymentIssue = async ({ fundValue, issueId }) => {
  const queryText = `UPDATE issues SET funded_amount=funded_amount+${fundValue} WHERE (id = '${issueId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  const [oneRow] = rows;
  return oneRow;
};

module.exports = submitAccountPaymentIssue;

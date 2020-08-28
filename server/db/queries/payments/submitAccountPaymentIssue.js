const { singleQuery } = require('../../baseQueries');

// UPDATE fund_value of issue for payment
const submitAccountPaymentIssue = async ({ fundValue, issueId }) => {
  const queryText = `
    UPDATE issues
    SET funded_amount=funded_amount+$1
    WHERE id = $2
    RETURNING *
  `;
  const { rows } = await singleQuery({
    queryText,
    values: [fundValue, issueId],
  });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = submitAccountPaymentIssue;

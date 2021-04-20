const { singleQuery } = require('../../baseQueries');

const verifyPayout = async ({ fundingId }) => {
  const queryText = `
    SELECT
      f.funded_amount AS "fundedAmount",
      f.user_accepted AS "userAccepted",
      r.payout_url AS "payoutUrl"
    FROM funding f
    JOIN issues i ON f.issue_id = i.id
    JOIN repos r ON i.repo_id = r.id
    WHERE f.id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [fundingId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = verifyPayout;

const { singleQuery } = require('../../baseQueries');

const acceptBounty = async ({ fundingId }) => {
  const queryText = `
    WITH accepted AS (
      UPDATE funding SET user_accepted = true
      WHERE id = $1
      RETURNING user_id, funded_amount, rep
    )
    UPDATE users
    SET balance = balance + (SELECT funded_amount FROM accepted),
        rep = rep + (SELECT rep FROM accepted)
    WHERE id = (SELECT user_id FROM accepted)
  `;
  await singleQuery({ queryText, values: [fundingId] });
};

module.exports = acceptBounty;

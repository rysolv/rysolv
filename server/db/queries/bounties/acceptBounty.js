const { singleQuery } = require('../../baseQueries');

const acceptBounty = async ({ fundingId, repoPayout, userPayout }) => {
  /*
   * Set user_accepted = true
   * Add userPayout & repoPayout to funding
   * Credit user account with user_payout & rep
   */
  const queryText = `
    WITH accepted AS (
      UPDATE funding SET
        repo_payout = $2,
        user_accepted = true,
        user_accepted_date = $4,
        user_payout = $3
      WHERE id = $1
      RETURNING user_id, funded_amount, rep, user_payout
    )
    UPDATE users SET
      balance = balance + (SELECT user_payout FROM accepted),
      rep = rep + (SELECT rep FROM accepted),
      modified_date = $4
    WHERE id = (SELECT user_id FROM accepted)
  `;
  await singleQuery({
    queryText,
    values: [fundingId, repoPayout, userPayout, new Date()],
  });
};

module.exports = acceptBounty;

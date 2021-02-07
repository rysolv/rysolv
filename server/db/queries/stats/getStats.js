const { singleQuery } = require('../../baseQueries');

const getStats = async () => {
  const contributionQuery = `
    SELECT
      u.id,
      u.profile_pic AS "profilePic",
      u.username,
      SUM(a.funded_value) AS "fundedValue"
    FROM activity a
    JOIN users u ON a.user_id = u.id
    LEFT JOIN issues i on a.issue_id = i.id
    WHERE a.action_type = 'fund'
    AND a.issue_id IS NOT NULL
    AND i.is_deleted = false
    GROUP BY u.id, u.profile_pic, u.username
    ORDER BY SUM(a.funded_value) DESC
    LIMIT 10
  `;
  const dollarsEarnedQuery = `
    SELECT
      dollars_earned AS "dollarsEarned", id, profile_pic AS "profilePic", username
    FROM users
    WHERE is_deleted = false AND email_verified = true
    ORDER BY dollars_earned DESC
    LIMIT 10
  `;
  const repQuery = `
    SELECT
      id, profile_pic AS "profilePic", rep, username
    FROM users
    WHERE is_deleted = false AND email_verified = true
    ORDER BY rep DESC
    LIMIT 10
  `;
  const totalFundedQuery = `
    SELECT
      COALESCE(SUM(a.funded_value),0) AS "totalFunded"
    FROM activity a
    LEFT JOIN issues i ON a.issue_id = i.id
    WHERE a.issue_id IS NOT NULL
    AND i.is_deleted = false
  `;
  const totalEarnedQuery = `
    SELECT
      COALESCE(SUM(funded_amount),0) AS "totalEarned"
    FROM funding
    WHERE is_approved = true
  `;
  const totalResolvedQuery = `
    SELECT
      COUNT(id) AS "totalResolved"
    FROM funding
    WHERE is_approved = TRUE
  `;

  const queryArray = [
    contributionQuery,
    dollarsEarnedQuery,
    repQuery,
    totalEarnedQuery,
    totalFundedQuery,
    totalResolvedQuery,
  ];

  const resultArray = await Promise.all(
    queryArray.map(queryText => singleQuery({ queryText })),
  );

  const { rows: mostContribution } = resultArray[0];
  const { rows: mostEarned } = resultArray[1];
  const { rows: mostRep } = resultArray[2];
  const { rows: totalEarnedRows } = resultArray[3];
  const { rows: totalFundedRows } = resultArray[4];
  const { rows: totalResolvedRows } = resultArray[5];

  const { totalEarned } = totalEarnedRows[0];
  const { totalFunded } = totalFundedRows[0];
  const totalAvailable = totalFunded - totalEarned;
  const { totalResolved } = totalResolvedRows[0];

  return {
    mostContribution,
    mostEarned,
    mostRep,
    totalAvailable,
    totalEarned,
    totalFunded,
    totalResolved,
  };
};

module.exports = getStats;

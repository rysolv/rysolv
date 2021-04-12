const { singleQuery } = require('../../baseQueries');

const getUserBounties = async ({ userId }) => {
  const queryText = `
    SELECT
      f.created_date AS "createdDate",
      f.funded_amount AS "fundedAmount",
      f.id,
      f.is_approved AS "isApproved",
      f.issue_id AS "issueId",
      f.pullrequest_id AS "pullrequestId",
      f.rep,
      f.user_accepted AS "userAccepted",
      i.name,
      pr.html_url AS "pullRequestUrl"
    FROM funding f
    JOIN issues i on i.id = f.issue_id
    JOIN pullrequests pr on pr.pullrequest_id = f.pullrequest_id
      WHERE f.user_id = $1
      AND f.is_approved = true
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getUserBounties;

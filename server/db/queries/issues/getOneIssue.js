const { groupValues, issueDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single issue
const getOneIssue = async ({ issueId }) => {
  const queryText = `
    SELECT
      ${issueDetailValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS language,
      CASE WHEN pullrequests.merged = true THEN true ELSE false END AS "isPullRequestMerged",
      funding.user_accepted AS "isUserAccepted"
    FROM issues
    JOIN repos ON issues.repo_id = repos.id
    JOIN users ON issues.contributor_id = users.id
    LEFT JOIN attempting ON attempting.issue_id = issues.id
    LEFT JOIN comments ON comments.target = issues.id
    LEFT JOIN funding ON funding.issue_id = issues.id
    LEFT JOIN languages ON languages.issue_id = issues.id
    LEFT JOIN pullrequests on pullrequests.issue_id = issues.id AND pullrequests.is_deleted = false
    LEFT JOIN watching ON watching.issue_id = issues.id
    WHERE issues.id = $1
    AND issues.is_deleted = false
    GROUP BY ${groupValues}, funding.id, funding.is_approved, pullrequests.merged, users.id, users.profile_pic, users.username
  `;
  const { rows } = await singleQuery({ queryText, values: [issueId] });
  const [oneRow] = rows;
  if (oneRow) {
    const { isUserAccepted, open } = oneRow;
    if (isUserAccepted && !open) {
      const awardedUserQuery = `
        SELECT
          pullrequests.html_url AS "htmlUrl",
          users.id,
          users.profile_pic AS "profilePic",
          users.username
        FROM pullrequests
        LEFT JOIN users on users.id = pullrequests.user_id
        WHERE pullrequests.is_deleted = false
          AND pullrequests.issue_id = $1
          AND pullrequests.merged = true`;
      const { rows: awardedUserRows } = await singleQuery({
        queryText: awardedUserQuery,
        values: [issueId],
      });
      const [oneAwardedUserRow] = awardedUserRows;
      oneRow.awardedUser = oneAwardedUserRow;
    } else {
      oneRow.awardedUser = null;
    }
  }
  return oneRow;
};

module.exports = getOneIssue;

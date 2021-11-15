const { singleQuery } = require('../../baseQueries');

// GET issues based on user languages
const getRecommendedIssues = async ({ userId }) => {
  const queryText = `
    WITH recent_issues AS (
      SELECT
        DISTINCT ON (i.id)
        i.created_date,
        i.funded_amount,
        i.github_comment_count AS comments,
        i.id,
        i.name,
        i.repo,
        i.repo_id,
        l.language,
        r.name AS repo_name
      FROM issues i
      JOIN languages l ON l.issue_id = i.id
      JOIN repos r ON r.id = i.repo_id
      LEFT JOIN pullrequests pr ON pr.issue_id = i.id
      WHERE i.is_deleted = false
        AND i.open = true
        AND pr.pullrequest_id IS NULL
    ), user_languages AS (
      SELECT
        ARRAY_AGG(l.language) AS language_array,
        l.user_id
      FROM languages l
      WHERE user_id IS NOT null
      GROUP BY l.user_id
    )
    SELECT
      UNNEST(
        ARRAY_AGG((
          SELECT json_agg(top_issues) FROM (
            SELECT
              ri.comments,
              ri.created_date as "createdDate",
              ri.funded_amount AS "fundedAmount",
              ri.repo as "githubLink",
              ri.id,
              ri.language,
              ri.name,
              ri.repo_id as "repoId",
              ri.repo_name as "repoName"
            FROM recent_issues ri
            WHERE ri.language = ANY (ul.language_array)
            ORDER BY ri.created_date DESC
          ) AS top_issues
        ))
      ) AS "topIssues"
    FROM user_languages ul
    WHERE ul.user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  const { topIssues } = oneRow;
  return topIssues;
};

module.exports = getRecommendedIssues;

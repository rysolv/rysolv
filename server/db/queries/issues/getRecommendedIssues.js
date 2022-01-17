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
        COALESCE(ARRAY_AGG(DISTINCT(l.language)), '{}') AS languages,
        r.name AS repo_name
      FROM issues i
      JOIN languages l ON l.issue_id = i.id
      JOIN repos r ON r.id = i.repo_id
      LEFT JOIN pullrequests pr ON pr.issue_id = i.id
      WHERE i.is_deleted = false
      AND i.open = true
      AND pr.pullrequest_id IS NULL
      GROUP BY
        i.created_date,
        i.funded_amount,
        i.id,
        i.github_comment_count,
        i.name,
        i.repo,
        i.repo_id,
        r.name
    ), user_languages AS (
      SELECT
        ARRAY_AGG(t.short_name) AS language_array,
        pts.user_id
      FROM technologies t
      JOIN position_tech_stack pts ON pts.technology_id = t.id
      WHERE pts.user_id IS NOT null
      GROUP BY pts.user_id
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
              ri.languages,
              ri.name,
              ri.repo_id as "repoId",
              ri.repo_name as "repoName"
            FROM recent_issues ri
            WHERE ri.languages <@ (ul.language_array)
            ORDER BY ri.created_date DESC
          ) AS top_issues
        ))
      ) AS "topIssues"
    FROM user_languages ul
    WHERE ul.user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  if (rows.length) {
    const [oneRow] = rows;
    const { topIssues } = oneRow;
    return topIssues;
  }
  return [];
};

module.exports = getRecommendedIssues;

const { singleQuery } = require('../../baseQueries');

// Returns: last 52 weeks of commits, total commits, average lines, total repos
const getCommitStats = async ({ userId }) => {
  const queryText = `
    WITH commit_stats AS (
      SELECT
        t1.year_month AS month,
        t2.commit_count AS commits
      FROM (
        SELECT month, to_char(date_trunc('week', month), 'mm-dd-yy') AS year_month
        FROM generate_series((now() - interval '1 year')::DATE, now():: DATE, '1 week'::interval) AS month
      ) t1
      LEFT OUTER JOIN (
        SELECT to_char(date_trunc('week', commit_date), 'mm-dd-yy') AS year_month,
        COUNT(commit_hash) AS commit_count
        FROM git_commits
        WHERE user_id = $1
        GROUP BY year_month
      ) t2 ON t1.year_month = t2.year_month
    ),
    repo_stats AS (
      SELECT
        COUNT(DISTINCT gr.id),
        SUM(gf.additions * gf.weight + gf.deletions * gf.weight)/COUNT(distinct gc.id) AS average_lines
      FROM git_commits gc
      JOIN git_files gf ON gf.commit_id = gc.id
      JOIN git_repos gr ON gr.id = gc.repo_id
      WHERE gc.user_id = $1
    )
    SELECT
      ARRAY_AGG(month) AS months,
      ARRAY_AGG(commits) AS commits,
      SUM(commits) AS "totalCommits",
      (SELECT count FROM repo_stats) AS "contributedTo",
      (SELECT average_lines FROM repo_stats) AS "averageLines"
    FROM commit_stats
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getCommitStats;

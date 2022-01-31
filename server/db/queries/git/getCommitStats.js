const { singleQuery } = require('../../baseQueries');

// Returns: last 52 weeks of commits, total commits, average lines, total repos
const getCommitStats = async ({ userId }) => {
  const queryText = `
    WITH commit_stats AS (
      SELECT
        to_char(date_trunc('month', commit_date), 'Mon, YY') AS week,
        COUNT(gc.commit_hash)::int AS commits
      FROM git_commits gc
      WHERE gc.user_id = $1
      GROUP BY week
      ORDER BY MIN(commit_date) ASC
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
      ARRAY_AGG(week) AS weeks,
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

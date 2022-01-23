const { singleQuery } = require('../../baseQueries');

// Return last 52 weeks of commits
const getWeeklyCommits = async ({ userId }) => {
  const queryText = `
    select
    to_char(date_trunc('week', commit_date), 'Mon-dd') as week,
    count(gc.commit_hash)::int as commits
    from git_commits gc
    where commit_date > now() - '12 months'::interval
    group by week
    order by min(commit_date) asc
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getWeeklyCommits;

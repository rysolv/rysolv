const { singleQuery } = require('../../baseQueries');

// Get commits per language for the last 12 months
const getTopLanguages = async ({ userId }) => {
  const queryText = `
    select
      count(gc.commit_hash) as commits,
      gf.language
    from git_files gf
    join git_commits gc on gf.commit_id = gc.id
    where
      gc.commit_date > now() - '12 months'::interval
      and language is not null
    group by gf.language
    order by commits desc
    limit 8
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getTopLanguages;

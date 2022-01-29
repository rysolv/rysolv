const { singleQuery } = require('../../baseQueries');

// Get commits per language for the last 12 months
const getTopLanguages = async ({ userId }) => {
  const queryText = `
    SELECT
      COUNT(gc.commit_hash) AS commits,
      gf.language
    FROM git_files gf
    JOIN git_commits gc ON gf.commit_id = gc.id
    WHERE
      gc.user_id = $1
      AND gc.commit_date > now() - '12 months'::interval
      AND language IS NOT NULL
    GROUP BY gf.language
    ORDER BY commits desc
    LIMIT 8
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getTopLanguages;

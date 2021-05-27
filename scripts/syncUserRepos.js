/* eslint-disable camelcase, no-console, no-unused-vars */
const { Octokit } = require('@octokit/rest');
const { createTokenAuth } = require('@octokit/auth-token');

const { connect } = require('./connect');

// Connect to DB
const env = process.argv[2];
const { singleQuery } = connect(env);

/**
 * Describe what this script does
 */

async function sample() {
  const t1 = Date.now();
  let count = 0;
  const getUsersQuery = `
    SELECT * FROM users WHERE github_id IS NOT null
  `;
  const { rows } = await singleQuery({
    queryText: getUsersQuery,
  });

  console.log(`Updating ${rows.length} users`);

  await Promise.all(
    rows.map(async ({ id, github_id }) => {
      try {
        const updateUserIdQuery = `
          UPDATE user_repos SET user_id = $1
          WHERE github_id = $2
          AND user_id IS null
        `;
        const { rowCount } = await singleQuery({
          queryText: updateUserIdQuery,
          values: [id, github_id],
        });
        count += rowCount;
      } catch (error) {
        console.log(error);
      }
    }),
  );

  console.log(`${count} rows affected.`);
  const t2 = Date.now();
  console.log(`Finished in  ${t2 - t1}ms`);
  process.exit();
}

sample();

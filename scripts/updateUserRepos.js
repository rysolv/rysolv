/* eslint-disable no-console, no-unused-vars */
const { Octokit } = require('@octokit/rest');
const { createTokenAuth } = require('@octokit/auth-token');

const { connect } = require('./connect');
const { formatRepoUrl } = require('../server/integrations/github/helpers');

// Connect to DB
const env = process.argv[2];
const { pool, singleQuery } = connect(env);

/**
 * Update existing repos with the github_owner, and check if any repos have a
 * github_owner that is a Rysolv user
 */
async function updateUserRepos() {
  const t1 = Date.now();

  // Connect to Octokit API
  const auth = createTokenAuth(process.env.GITHUB_TOKEN);
  const { token } = await auth();
  const GITHUB = new Octokit({
    auth: token,
  });

  const getReposQuery = `
    SELECT
      repos.repo_url AS "repoUrl",
      user_repos.id
    FROM repos
    LEFT JOIN user_repos ON user_repos.repo_id = repos.id
    WHERE repos.is_deleted = false
    AND repos.is_edited = false
    AND repos.is_manual = false
    AND user_repos.user_type = 'github_owner'
    AND user_repos.github_id IS NULL
  `;

  // Get repos
  const { rows } = await singleQuery({ queryText: getReposQuery }).catch(err =>
    console.log('Get repos: ', err),
  );
  console.log(`Updating ${rows.length} repos`);
  await Promise.all(
    rows.map(async ({ id, repoUrl }) => {
      const { organization, repo } = formatRepoUrl(repoUrl);

      const {
        data: { owner },
      } = await GITHUB.repos.get({
        owner: organization,
        repo,
      });

      const updateUserReposQuery = `
        UPDATE user_repos SET github_id = $1
        WHERE id = $2
      `;
      await singleQuery({
        queryText: updateUserReposQuery,
        values: [owner.id, id],
      });
    }),
  );

  const getGithubOwnerQuery = `
    SELECT
      user_repos.github_id AS "githubId",
      user_repos.id
    FROM user_repos
    LEFT JOIN repos ON repos.id = user_repos.repo_id
    WHERE repos.is_deleted = false
    AND repos.is_edited = false
    AND repos.is_manual = false
    AND user_repos.user_id IS NULL
    AND user_repos.user_type = 'github_owner'
  `;

  // Get github owners
  const { rows: githubOwnerRows } = await singleQuery({
    queryText: getGithubOwnerQuery,
  }).catch(err => console.log('Get github owners: ', err));
  console.log(`Updating ${rows.length} github owners`);
  await Promise.all(
    githubOwnerRows.map(async ({ githubId, id }) => {
      const getUserIdQuery = `
        SELECT id FROM users WHERE github_id = $1
      `;
      const { rows: userIdRows } = await singleQuery({
        queryText: getUserIdQuery,
        values: [githubId],
      });

      const updateGithubOwnerQuery = `
        UPDATE user_repos SET user_id = $1
        WHERE id = $2
      `;
      await singleQuery({
        queryText: updateGithubOwnerQuery,
        values: [userIdRows.id, id],
      });
    }),
  );

  const t2 = Date.now();
  pool.end();
  console.log(`Finished in  ${t2 - t1}ms`);
}

updateUserRepos();

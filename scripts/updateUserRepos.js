/* eslint-disable no-console, no-unused-vars */
const { Octokit } = require('@octokit/rest');
const { createTokenAuth } = require('@octokit/auth-token');
const { v4: uuidv4 } = require('uuid');

const { connect } = require('./connect');
const { formatRepoUrl } = require('../server/integrations/github/helpers');

// Connect to DB
const env = process.argv[2];
const { pool, singleQuery } = connect(env);

/**
 * Update existing repos with the github_owner and rysolv_owner
 * Check if any repos have a github_owner that is a Rysolv user
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
    SELECT r.owner_id AS "userId", r.id AS "repoId", r.repo_url AS "repoUrl" FROM repos r
    LEFT JOIN user_repos ur ON ur.repo_id = r.id
    WHERE ur.id IS null
  `;

  // Get repos
  const { rows } = await singleQuery({ queryText: getReposQuery }).catch(err =>
    console.log('Get repos: ', err),
  );
  console.log(`Updating ${rows.length} repos`);
  await Promise.all(
    rows.map(async ({ userId, repoId, repoUrl }) => {
      const { organization, repo } = formatRepoUrl(repoUrl);

      const {
        data: { owner },
      } = await GITHUB.repos.get({
        owner: organization,
        repo,
      });

      console.log(owner.login);
      const values = [uuidv4(), owner.id, repoId, userId];

      const updateUserReposQuery = `
        INSERT INTO user_repos (id, github_id, repo_id, user_id, user_type)
        SELECT $1, $2, $3, $4, 'github_owner'
        WHERE NOT EXISTS (
          SELECT 1 FROM user_repos ur
          WHERE ur.user_id = $4
          AND ur.repo_id =  $3
          AND ur.user_type = 'github_owner'
        )
      `;
      await singleQuery({
        queryText: updateUserReposQuery,
        values,
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
  console.log(`Updating ${githubOwnerRows.length} github owners`);
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

  // Add rysolvOwner to user_repos
  const getRysolvOwnerQuery = `
    SELECT
      r.id AS "repoId",
      r.owner_id AS "userId",
      u.github_id AS "githubId"
    FROM repos r
    JOIN users u ON u.id = r.owner_id
  `;

  // Get github owners
  const { rows: rysolvOwners } = await singleQuery({
    queryText: getRysolvOwnerQuery,
  }).catch(err => console.log('Get rysolv owners: ', err));

  console.log(`Updating ${rysolvOwners.length} rysolv owners`);

  let rowsInserted = 0;
  await Promise.all(
    rysolvOwners.map(async ({ githubId, repoId, userId }) => {
      const values = [uuidv4(), githubId, repoId, userId];

      const insertRysolvOwnerQuery = `
        INSERT INTO user_repos (id, github_id, repo_id, user_id, user_type)
        SELECT $1, $2, $3, $4, 'rysolv_owner'
        WHERE NOT EXISTS (
          SELECT 1 FROM user_repos ur
          WHERE ur.user_id = $4
          AND ur.repo_id =  $3
          AND ur.user_type = 'rysolv_owner'
        )
      `;
      const { rowCount } = await singleQuery({
        queryText: insertRysolvOwnerQuery,
        values,
      });
      rowsInserted += rowCount;
    }),
  );
  console.log(`Added ${rowsInserted} rysolv owners`);

  const t2 = Date.now();
  pool.end();
  console.log(`Finished in  ${t2 - t1}ms`);
}

updateUserRepos();

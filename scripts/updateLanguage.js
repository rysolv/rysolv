/* eslint-disable no-console, no-unused-vars */
const { Octokit } = require('@octokit/rest');
const { createTokenAuth } = require('@octokit/auth-token');
const { v4: uuidv4 } = require('uuid');

// Connect to DB
const { connect } = require('./connect');
const env = process.argv[2];
const { pool, singleQuery } = connect(env);

/**
 * Pull user languages from Github and update the language table
 */

async function updateUserLanguages() {
  const t1 = Date.now();

  // Connect to Octokit API
  const auth = createTokenAuth(process.env.GITHUB_TOKEN);
  const { token } = await auth();
  const GITHUB = new Octokit({
    auth: token,
  });

  const getUsersQuery = `
    SELECT github_username AS "githubUsername", id FROM users
    WHERE github_username IS NOT NULL
    ORDER BY created_date ASC
    LIMIT 50 OFFSET 400
  `;

  // Get github users
  const { rows } = await singleQuery({ queryText: getUsersQuery }).catch(err =>
    console.log('Get users: ', err),
  );
  console.log(`Updating ${rows.length} users`);
  await Promise.all(
    rows.map(async ({ githubUsername, id }) => {
      let languageArray = [];

      // Get list of user repos
      const { data: repos } = await GITHUB.repos
        .listForUser({
          username: githubUsername,
        })
        .catch(err => console.log('Get repos: ', err));

      if (repos && repos.length) {
        // For each repo, get unique languages and insert into table
        await Promise.all(
          repos.map(async ({ name }) => {
            // Get languages from user repo
            const { data: languages } = await GITHUB.repos
              .listLanguages({
                owner: githubUsername,
                repo: name,
              })
              .catch(err => console.log('Get Languages: ', err));

            // Get a unique set of languages from user repos
            const tempLanguageArray = languages ? Object.keys(languages) : [];
            languageArray = [
              ...new Set([...languageArray, ...tempLanguageArray]),
            ];
          }),
        );
      }
      // Insert language into the language table
      await Promise.all(
        languageArray.map(async language => {
          await insertLanguage({ language, userId: id });
        }),
      );
    }),
  );
  const t2 = Date.now();
  pool.end();
  console.log(`Finished in  ${t2 - t1}ms`);
}

// Insert language if it doesn't exist
async function insertLanguage({ language, userId }) {
  const values = [
    uuidv4(), // id
    language, // language
    userId, // user_id
    language, // language (has to be like this)
  ];

  const insertLanguageQuery = `
    INSERT INTO languages(id, language, user_id)
    SELECT $1, $2, $3
    WHERE NOT EXISTS (
      SELECT * FROM languages
      WHERE user_id = $3
      AND language ILIKE $4
    )
  `;
  await singleQuery({ queryText: insertLanguageQuery, values });
}

updateUserLanguages();

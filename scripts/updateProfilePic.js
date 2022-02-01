/* eslint-disable no-console */
const { Octokit } = require('@octokit/rest');
const { createTokenAuth } = require('@octokit/auth-token');

const { connect } = require('./connect');
const { uploadImage } = require('../server/middlewares/imageUpload');

const env = process.argv[2];
const { singleQuery } = connect(env);

/**
 * One time script to sync user profile_pic to github avatar
 * Run with 'node updateProfilePic [local, dev, prod]'
 */

async function updateProfilePic() {
  const t1 = Date.now();

  // Authenticate github api
  const auth = createTokenAuth(process.env.GITHUB_TOKEN);
  const { token } = await auth();
  const GITHUB = new Octokit({
    auth: token,
  });

  const getUsersQuery = `
    SELECT github_username AS "githubUsername", id FROM users
    WHERE github_username IS NOT NULL
    AND created_date > now() - '3 week'::interval
  `;

  const updateUserQuery = `
    UPDATE users SET profile_pic = $1
    WHERE id = $2
  `;

  // Get github users
  const { rows } = await singleQuery({ queryText: getUsersQuery });
  console.log(`Updating profiles for ${rows.length} users.`);

  try {
    await Promise.all(
      rows.map(async ({ githubUsername, id }, i) => {
        try {
          // Fetch github avatar
          const { data } = await GITHUB.users.getByUsername({
            username: githubUsername,
          });
          const { avatar_url: avatarUrl } = data;

          // Uplaod image to S3
          const { uploadUrl } = await uploadImage(avatarUrl);

          // Update users.profile_pic
          await singleQuery({
            queryText: updateUserQuery,
            values: [uploadUrl, id],
          });

          console.log(`Updated user ${id} (${i + 1}/${rows.length})`);
        } catch (error) {
          console.log(error);
        }
      }),
    );
  } catch (error) {
    console.log(error);
  }

  const t2 = Date.now();
  console.log(`Finished in  ${t2 - t1}ms`);
  process.exit();
}

updateProfilePic();

/* eslint-disable camelcase, no-console, no-unused-vars */
const Jimp = require('jimp');
const { connect } = require('./connect');
const { uploadImage } = require('../server/middlewares/imageUpload');

// Connect to DB
const env = process.argv[2];
const { singleQuery } = connect(env);

/**
 * Takes existing profile pic, runs it through the Jimp Blur filter
 * and uploads to users.profile_pic_blur
 */

async function blur_images() {
  const t1 = Date.now();

  const getUsersQuery = `
    SELECT id, profile_pic FROM users
    WHERE created_date > now() - '3 week'::interval
  `;
  const { rows: users } = await singleQuery({
    queryText: getUsersQuery,
  });

  console.log(users.length);
  await Promise.all(
    users.map(async ({ id, profile_pic }, i) => {
      // Upload blurred image
      const image = await Jimp.read(profile_pic);
      image.blur(15);
      const base64 = await image.getBase64Async(Jimp.AUTO);
      console.log('BASE 64: ', base64.length);

      const { uploadUrl } = await uploadImage(base64);

      await singleQuery({
        queryText: `UPDATE users SET profile_pic_blur = $1 WHERE id = $2`,
        values: [uploadUrl, id],
      });
      console.log(`Updated user ${id} (${i + 1}/${users.length})`);
    }),
  );

  const t2 = Date.now();
  console.log(`Finished in  ${t2 - t1}ms`);
  process.exit();
}

blur_images();

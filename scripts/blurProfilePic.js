/* eslint-disable camelcase, no-console, no-unused-vars */
const Jimp = require('jimp');
const { uploadImage } = require('../server/middlewares/imageUpload');
const { connect } = require('./connect');

// Connect to DB
const env = process.argv[2];
const { singleQuery } = connect(env);

/**
 * Takes existing profile pic, runs it through the Jimp Blur filter
 * and uploads to users.profile_pic_blur
 */

async function blur_images() {
  const t1 = Date.now();

  const getUsersQuery = `SELECT id, profile_pic FROM users WHERE profile_pic_blur IS NULL`;
  const { rows: users } = await singleQuery({
    queryText: getUsersQuery,
  });

  console.log(users.length);
  await Promise.all(
    users.map(async ({ id, profile_pic }) => {
      // Upload blurred image
      const image = await Jimp.read(profile_pic);
      image.blur(15);
      const base64 = await image.getBase64Async(Jimp.AUTO);
      console.log('BASE 64: ', base64.length);

      const { uploadUrl } = await uploadImage(base64);
      console.log('Upload URL: ', uploadUrl);

      const saveUrlQuery = `UPDATE users SET profile_pic_blur = $1 WHERE id = $2`;

      await singleQuery({
        queryText: saveUrlQuery,
        values: [uploadUrl, id],
      });
    }),
  );

  const t2 = Date.now();
  console.log(`Finished in  ${t2 - t1}ms`);
  process.exit();
}

blur_images();

const AWS = require('aws-sdk');
const crypto = require('crypto');

AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const arrayCheck = result => {
  if (Array.isArray(result) && result.length > 1) {
    return result;
  }
  if (Array.isArray(result) && result.length === 1) {
    return result[0];
  }
  return null;
};

const createBucketKeyS3 = () => {
  const hashBase = `${Date.now()}`;
  const hash = crypto
    .createHash('md5')
    .update(hashBase)
    .digest('hex');
  return `${process.env.S3_BUCKET_NAME}/${hash}`;
};

const uploadFileS3 = async ({ file, key = null, type }) => {
  const fileKey = key || createBucketKeyS3();
  const fileBuffer = Buffer.from(file, 'base64');
  const payload = {
    Body: fileBuffer,
    Bucket: process.env.S3_BUCKET_NAME,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
    Key: fileKey,
  };
  const result = await s3.upload(payload).promise();
  return result;
};

module.exports = {
  arrayCheck,
  uploadFileS3,
};
